import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDrawer } from '@angular/material';
import { LocaleService } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { assign, cloneDeep, keyBy } from 'lodash';
import { takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GenMapperService } from '../gen-mapper.service';
import { NodeClipboardService } from '../node-clipboard.service';
import { TemplateUtils } from '../template-utils';
import { Utils } from '@core/utils';
import { GNode } from '../gen-mapper.interface';
import { GMTemplate, GMField } from '@templates';
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
    public pasteNode = new EventEmitter<GNode>();

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
        private fb: FormBuilder,
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
                        title: this.localeService.t('saveChanges'),
                        prompt: this.localeService.t('saveChangesQuestion'),
                        buttons: [
                            this.localeService.t('en_Yes'),
                            this.localeService.t('en_Cancel'),
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

    public onPasteNode(): void {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: this.localeService.t('Message_confirmPasteNode'),
                    alert: this.localeService.t('Message_confirmPasteNodeWarning'),
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.pasteNode.emit(this.node);
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
