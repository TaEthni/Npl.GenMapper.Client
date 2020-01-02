import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { LocaleService } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { GMField } from '@templates';
import { assign, cloneDeep } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GNode } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { NodeClipboardService } from '../node-clipboard.service';
import { Template } from '../template.model';


@Component({
    selector: 'app-node-drawer',
    templateUrl: './node-drawer.component.html',
    styleUrls: ['./node-drawer.component.scss']
})
export class NodeDrawerComponent extends Unsubscribable implements OnInit, OnChanges {
    @Input()
    public node: GNode;

    @Input()
    public document: DocumentDto;

    @Input()
    public documents: DocumentDto[];

    @Input()
    public template: Template;

    @Input()
    public hideActions: boolean;

    @Output()
    public pasteAsChildNode = new EventEmitter<GNode>();

    @Output()
    public replaceNode = new EventEmitter<GNode>();

    @Output()
    public copyNode = new EventEmitter<GNode>();

    @Output()
    public updateNode = new EventEmitter<GNode>();

    @Output()
    public deleteNode = new EventEmitter<GNode>();

    @Output()
    public importSubtree = new EventEmitter<GNode>();

    public isNodeInClipboard: boolean;
    public clonedNode: GNode;
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
        this.fields = this.template.fields;

        this.nodeClipboard.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.checkClipboard(result);
            });
    }

    public ngOnChanges(change: SimpleChanges): void {
        if (change.document && change.document.currentValue && change.document.firstChange) {
            this.initializeForm();
        }

        if (change.node && change.node.currentValue && !change.node.previousValue) {
            this.configureNode();
            this.drawer.open();
        } else {
            this.drawer.close();
        }

        if (change.node && !change.node.currentValue && change.node.previousValue) {
            this.form.reset();
        }
    }

    public configureNode(): void {
        this.checkClipboard();
        this.clonedNode = cloneDeep(this.node);
        delete this.clonedNode.descendants;
        this.form.reset(this.clonedNode);
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
        if (this.clonedNode.hasOwnProperty('active') && this.clonedNode.hasOwnProperty('inactiveReason') && this.clonedNode.active) {
            this.clonedNode.inactiveReason = null;
        }

        this.template.fields.forEach(field => {
            if (field.sumOfFields) {
                let v: number = 0;
                field.sumOfFields.forEach((fieldId) => {
                    // const otherField = this.template.getField(fieldId);
                    const value = parseInt(this.clonedNode[fieldId]);
                    if (value) {
                        v += value;
                    }
                });
                this.clonedNode[field.id] = v;
            }
        });

        assign(this.node, this.clonedNode);

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

    public onFormChange(value: GNode): void {
        assign(
            this.clonedNode,
            value
        );
        this.drawer.disableClose = this.form.dirty;
    }

    private initializeForm(): void {
        const group: any = {};
        const fields: { name: string, order: number }[] = [];

        this.template.fields
            .filter(field => !!field.type)
            .forEach(field => {
                fields.push({ name: field.id, order: field.controlOrder });
            });

        // this.document.attributes
        //     .filter(attr => !!attr.type && !this.template.fieldsByKey[attr.propertyName])
        //     .forEach(attr => {
        //         fields.push({ name: attr.propertyName, order: attr.order });
        //     });

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
                this.onFormChange(this.form.getRawValue());
            });
    }

    private checkClipboard(clipboard?: GNode[]): void {
        clipboard = clipboard || this.nodeClipboard.getValue();
        if (!clipboard) {
            this.isNodeInClipboard = false;
        }

        if (clipboard) {
            const root = clipboard.find(n => n.parentId === '');
            if (root && root.id === this.node.id) {
                this.isNodeInClipboard = false;
            } else {
                this.isNodeInClipboard = true;
            }
        }
    }
}
