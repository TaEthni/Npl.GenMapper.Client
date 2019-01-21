import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-create-document-dialog',
    templateUrl: './create-document-dialog.component.html',
    styleUrls: ['./create-document-dialog.component.scss']
})
export class CreateDocumentDialogComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<CreateDocumentDialogComponent>
    ) { }

    public ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl('',
                [Validators.minLength(2), Validators.required]
            )
        });
    }

    public onSubmit(): void {
        this.dialogRef.close(this.form.value);
    }
}
