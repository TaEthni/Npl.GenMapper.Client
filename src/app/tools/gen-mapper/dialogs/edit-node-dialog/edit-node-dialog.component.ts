import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocaleService } from '@core/locale.service';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';

import { GMField, GMTemplate, GNode } from '../../gen-mapper.interface';
import { NodeClipboardService } from '../../node-clipboard.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export interface EditNodeDialogResponse {
    isCancel: boolean;
    isUpdate: boolean;
    isDeleteSubtree: boolean;
    isImportSubtree: boolean;
    isPasteNode: boolean;
    data: object;
    content?: string;
}

export interface EditNodeDialogConfig {
    nodeData: GNode;
    descendants: GNode[];
    template: GMTemplate;
    language: string;
    nodes: GNode[];
}

@Component({
    selector: 'app-edit-node-dialog',
    templateUrl: './edit-node-dialog.component.html',
    styleUrls: ['./edit-node-dialog.component.scss']
})
export class EditNodeDialogComponent {

    private template: GMTemplate = null;
    public fields: GMField[];
    public model: any;
    public locale: any;
    public isNodeClipboard: boolean;

    constructor(
        private dialogRef: MatDialogRef<EditNodeDialogComponent>,
        private matDialog: MatDialog,
        private localeService: LocaleService,
        private nodeClipboard: NodeClipboardService,
        @Inject(MAT_DIALOG_DATA) public data: EditNodeDialogConfig
    ) {
        this.isNodeClipboard = !!this.nodeClipboard.getValue();
        this.model = Object.assign({}, data.nodeData);
        this.locale = data.template.translations[data.language].translation[data.template.format];
        this.template = data.template;

        this.template.fields.forEach(field => {
            if (this.locale[field.header]) {
                field.localeLabel = this.localeService.t(this.template.format + '.' + field.header);
                if (field.values) {
                    field.values.forEach((v: any) => {
                        v.localeLabel = this.localeService.t(this.template.format + '.' + v.header);
                    });
                }
            }
        });

        this.fields = this.template.fields;
    }

    public onSubmit(): void {

        // if node is active, then remove reason for being inactive.
        if (this.model.hasOwnProperty('active') && this.model.hasOwnProperty('inactiveReason') && this.model.active) {
            this.model.inactiveReason = null;
        }

        this.dialogRef.close({
            isUpdate: true,
            data: this.model
        } as EditNodeDialogResponse);
    }

    public onCancel(): void {
        this.dialogRef.close({
            isCancel: true
        } as EditNodeDialogResponse);
    }

    public onDeleteSubtree(): void {
        this.dialogRef.close({
            isDeleteSubtree: true,
            data: this.model,
        } as EditNodeDialogResponse);
    }

    public onPasteNode(): void {
        this.matDialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: this.localeService.t('messages.confirmPasteNode'),
                    alert: this.localeService.t('messages.confirmPasteNodeWarning'),
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.dialogRef.close({
                        isPasteNode: true,
                        data: this.model,
                    } as EditNodeDialogResponse);
                }
            });
    }

    public onCopyNode(): void {
        this.nodeClipboard.set(this.data.descendants);
    }

    public onImportSubtree(): void {
        this.matDialog
            .open(FileInputDialogComponent, { minWidth: '400px' })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.dialogRef.close({
                        isImportSubtree: true,
                        data: this.model,
                        content: result.content,
                    } as EditNodeDialogResponse);
                }
            });
    }

    public onFormChange(value: any): void {
        Object.assign(this.model, value);
    }
}
