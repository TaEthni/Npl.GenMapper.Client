import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-file-input-dialog',
    templateUrl: './file-input-dialog.component.html',
    styleUrls: ['./file-input-dialog.component.scss']
})
export class FileInputDialogComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<FileInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: {},
    ) { }

    public ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(null),
            content: new FormControl(null, [Validators.required])
        });
    }

    public onSubmit(): void {
        this.dialogRef.close(this.form.value);
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onInputChange(event: Event, input: HTMLInputElement): void {
        const reader = new FileReader();

        if (input.files && input.files.length) {
            const file = input.files.item(0);

            reader.readAsText(file);

            reader.onload = () => {
                this.form.patchValue({
                    title: file.name,
                    content: reader.result
                });

                // need to run CD since file load runs outside of zone
                this._changeDetectorRef.markForCheck();
            };
        }
    }
}

