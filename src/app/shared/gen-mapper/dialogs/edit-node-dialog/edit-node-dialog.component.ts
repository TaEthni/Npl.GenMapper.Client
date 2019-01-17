import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocaleService } from '@core/locale.service';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';

import { GMField, GMTemplate } from '../../gen-mapper.interface';

export interface EditNodeDialogResponse {
    isCancel: boolean;
    isUpdate: boolean;
    isDeleteSubtree: boolean;
    isImportSubtree: boolean;
    data: object;
    content?: string;
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

    constructor(
        private dialogRef: MatDialogRef<EditNodeDialogComponent>,
        private matDialog: MatDialog,
        private localeService: LocaleService,
        @Inject(MAT_DIALOG_DATA) public data: { nodeData: any, template: GMTemplate, language: string, nodes: any[] }
    ) {
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
