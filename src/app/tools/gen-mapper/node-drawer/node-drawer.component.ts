import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { LocaleService } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@models/document.model';
import { NodeDto } from '@models/node.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { GMField } from '@templates';
import { assign } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GenMapperService } from '../gen-mapper.service';
import { NodeClipboardService } from '../node-clipboard.service';


@Component({
    selector: 'app-node-drawer',
    templateUrl: './node-drawer.component.html',
    styleUrls: ['./node-drawer.component.scss']
})
export class NodeDrawerComponent extends Unsubscribable implements OnInit, OnChanges {
    public node: NodeDto;
    public document: DocumentDto;
    public documents: DocumentDto[];

    @Input()
    public hideActions: boolean;

    @Output()
    public pasteAsChildNode = new EventEmitter<NodeDto>();

    @Output()
    public replaceNode = new EventEmitter<NodeDto>();

    @Output()
    public copyNode = new EventEmitter<NodeDto>();

    @Output()
    public updateNode = new EventEmitter<NodeDto>();

    @Output()
    public deleteNode = new EventEmitter<NodeDto>();

    @Output()
    public importSubtree = new EventEmitter<NodeDto>();

    public isNodeInClipboard: boolean;
    public clonedNode: NodeDto;
    public fields: GMField[];
    public form: FormGroup;

    constructor(
        private localeService: LocaleService,
        private genMapper: GenMapperService,
        private nodeClipboard: NodeClipboardService,
        private drawer: MatDrawer,
        private dialog: MatDialog,
    ) { super(); }

    public ngOnInit(): void {

        this.genMapper.template$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(template => {
                this.fields = template.fields;
                this.initializeForm();
            });

        this.genMapper.documents$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(documents => this.documents = documents);

        this.genMapper.selectedDocument$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(document => {
                this.document = document;
            });

        this.genMapper.selectedNode$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(node => {
                this.node = node;

                if (this.node) {
                    this.configureNode();
                }

                if (this.node) {
                    this.drawer.open();
                } else {
                    this.form.reset();
                    this.drawer.close();
                }
            });

        this.nodeClipboard.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.checkClipboard(result);
            });
    }

    public ngOnChanges(change: SimpleChanges): void {
        // if (change.document && change.document.currentValue && change.document.firstChange) {
        //     this.initializeForm();
        // }

        // if (change.node && change.node.currentValue && !change.node.previousValue) {
        //     this.configureNode();
        //     this.drawer.open();
        // } else {
        //     this.drawer.close();
        // }

        // if (change.node && !change.node.currentValue && change.node.previousValue) {
        //     this.form.reset();
        // }
    }

    public configureNode(): void {
        this.checkClipboard();
        this.form.reset(this.node.attributes);
    }

    public onBackdropClick(): void {
        this.drawer.disableClose = this.form.dirty;

        if (this.form.dirty && this.drawer.disableClose) {
            this.dialog
                .open(ConfirmDialogComponent, {
                    data: {
                        title: this.localeService.t('Common_SaveChanges'),
                        prompt: this.localeService.t('Common_SaveChangesQuestion'),
                        buttons: [
                            this.localeService.t('Common_Yes'),
                            this.localeService.t('Common_Cancel'),
                        ],
                    }
                })
                .afterClosed()
                .subscribe(result => {
                    if (result) {
                        this.onSave();
                    }
                });
        } else {
            this.drawer.close();
        }
    }

    public onSave(): void {
        // if node is active, then remove reason for being inactive.

        const value = this.form.getRawValue();
        if (value.hasOwnProperty('active') && value.hasOwnProperty('inactiveReason') && value.active) {
            value.inactiveReason = null;
        }

        assign(this.node.attributes, value);
        this.updateNode.emit(this.node);
        this.drawer.disableClose = false;
        this.genMapper.setNode(null);
    }

    public onReplaceNode(): void {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: this.localeService.t('Message_confirmReplaceNode'),
                    alert: this.localeService.t('Message_confirmReplaceNodeWarning'),
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.replaceNode.emit(this.node);
                    this.drawer.close();
                }
            });
    }

    public onPastAsChildNode(): void {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: this.localeService.t('Message_confirmPasteAsChildNode'),
                    alert: this.localeService.t('Message_confirmPasteAsChildNodeWarning'),
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.pasteAsChildNode.emit(this.node);
                    this.drawer.close();
                }
            });
    }

    public onCopyNode(): void {
        this.copyNode.emit(this.node);
        this.checkClipboard();
    }

    public onImportSubtree(): void {
        this.dialog
            .open(FileInputDialogComponent, { minWidth: '350px' })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    // Update graph
                    // this.graph.csvIntoNode(node, result.content);

                    this.importSubtree.emit(result.content);
                    this.drawer.close();
                }
            });
    }

    public onCancel(): void {
        this.configureNode();
        this.drawer.disableClose = this.form.dirty;
    }

    public onDeleteNode(): void {
        this.deleteNode.emit(this.node);
    }

    public onFormChange(value: NodeDto): void {
        this.drawer.disableClose = this.form.dirty;
    }

    private initializeForm(): void {
        const group: any = {};
        const fields: { name: string, order: number }[] = [];

        this.fields
            .filter(field => !!field.type)
            .forEach(field => {
                fields.push({ name: field.id, order: field.controlOrder });
            });

        fields.sort((a, b) => a.order - b.order)
            .forEach(field => {
                group[field.name] = new FormControl(null);
            });

        // Add custom control for parentId
        group.parentId = new FormControl(null);

        if (group.location) {
            group.placeId = new FormControl(null);
            group.latitude = new FormControl(null);
            group.longitude = new FormControl(null);
        }

        this.form = new FormGroup(group);

        this.form.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                // we use getRawValue instead of form.value, so we can also get disabled controls
                this.drawer.disableClose = this.form.dirty;
            });
    }

    private checkClipboard(clipboard?: NodeDto[]): void {
        clipboard = clipboard || this.nodeClipboard.getValue();
        if (!clipboard) {
            this.isNodeInClipboard = false;
        }

        if (clipboard) {
            const root = clipboard.find(n => !n.parentId);
            if (root && root.id === this.node.id) {
                this.isNodeInClipboard = false;
            } else {
                this.isNodeInClipboard = true;
            }
        }
    }
}
