import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentDto } from '@npl-models/document.model';

@Component({
    selector: 'app-data-export-dialog',
    templateUrl: './data-export-dialog.component.html',
    styleUrls: ['./data-export-dialog.component.scss']
})
export class DataExportDialogComponent {

    public adminLevels = [
        { name: 'Admin Level 0: Country', id: 'adminLevel0' },
        { name: 'Admin Level 1: State (or equivalent) level', id: 'adminLevel1' },
        { name: 'Admin Level 2: District (or equivalent) level', id: 'adminLevel2' },
        { name: 'Admin Level 3: Block (or equivalent) level', id: 'adminLevel3' },
        { name: 'Admin Level 4: Village (or equivalent) level', id: 'adminLevel4' },
    ];

    public levelControl = new FormControl();

    constructor(
        private dialogRef: MatDialogRef<DataExportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DocumentDto[]
    ) { }

    public export(): void {
        this.dialogRef.close({
            adminLevel: this.levelControl.value.id
        });
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
