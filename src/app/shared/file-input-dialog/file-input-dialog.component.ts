import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-file-input-dialog',
    templateUrl: './file-input-dialog.component.html',
    styleUrls: ['./file-input-dialog.component.scss']
})
export class FileInputDialogComponent implements OnInit, OnDestroy {
    private inputElement: HTMLInputElement;

    @ViewChild('fileInput')
    public set fileInputElement(el: ElementRef) {
        if (el.nativeElement) {
            this.inputElement = el.nativeElement;
            el.nativeElement.removeEventListener('change', this.onInputChange);
            el.nativeElement.addEventListener('change', this.onInputChange);
        }
    }

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

    public ngOnDestroy(): void {
        if (this.inputElement) {
            this.inputElement.removeEventListener('change', this.onInputChange);
        }
    }

    public onSubmit(): void {
        this.dialogRef.close(this.form.value);
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onInputChange = (event: Event): void => {
        const input = this.inputElement;
        const reader = new FileReader();

        if (input.files && input.files.length) {
            const file = input.files.item(0);

            reader.readAsText(file);

            reader.onload = () => {
                this.form.patchValue({
                    title: file.name.replace(/\.csv/, ''),
                    content: reader.result
                });

                // need to run CD since file load runs outside of zone
                this._changeDetectorRef.markForCheck();
            };
        }
    }
}

