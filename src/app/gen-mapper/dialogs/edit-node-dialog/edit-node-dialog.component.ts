import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GMTemplate } from '../../gen-mapper.interface';

@Component({
    selector: 'app-edit-node-dialog',
    templateUrl: './edit-node-dialog.component.html',
    styleUrls: ['./edit-node-dialog.component.scss']
})
export class EditNodeDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<EditNodeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { nodeData: any, template: GMTemplate }
    ) { }

    public ngOnInit(): void {
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onDeleteSubtree(): void {
        this.dialogRef.close();
    }

    public onImportSubtree(): void {
        this.dialogRef.close();
    }
}
