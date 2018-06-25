import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GMTemplate, GMField } from '../../gen-mapper.interface';

export interface EditNodeDialogResponse {
    isCancel: boolean;
    isUpdate: boolean;
    isDeleteSubtree: boolean;
    isImportSubtree: boolean;
    data: object;
}

@Component({
    selector: 'app-edit-node-dialog',
    templateUrl: './edit-node-dialog.component.html',
    styleUrls: ['./edit-node-dialog.component.scss']
})
export class EditNodeDialogComponent {

    private _locale: object = {};
    private _data: object = {};
    private _template: GMTemplate = null;

    public fields: GMField[];
    public model: object;

    constructor(
        private dialogRef: MatDialogRef<EditNodeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { nodeData: any, template: GMTemplate, language: string }
    ) {
        this.model = Object.assign({}, data.nodeData);
        this._locale = data.template.translations[data.language].translation.template;
        this._template = data.template;

        this._template.fields.forEach(field => {
            if (this._locale[field.header]) {
                field.localeLabel = this._locale[field.header];
                if (field.values) {
                    field.values.forEach(v => {
                        v.localeLabel = this._locale[v.header];
                    });
                }
            }
        });

        this.fields = this._template.fields;
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
        this.dialogRef.close({
            isImportSubtree: true,
            data: this.model
        } as EditNodeDialogResponse);
    }

    public onFormChange(value: any): void {
        Object.assign(this.model, value);
    }
}
