import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Document } from '@shared/document.model';

@Component({
    selector: 'app-documents-dialog',
    templateUrl: './documents-dialog.component.html',
    styleUrls: ['./documents-dialog.component.scss']
})
export class DocumentsDialogComponent {

    public documents: Document[];

    constructor(
        private dialogRef: MatDialogRef<DocumentsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { documents: Document[] }
    ) {
        this.documents = data.documents;
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public selectDocument(document: Document): void {
        this.dialogRef.close(document);
    }
}
