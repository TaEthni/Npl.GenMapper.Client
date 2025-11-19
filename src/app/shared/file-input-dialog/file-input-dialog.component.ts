import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

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

    public form: UntypedFormGroup;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<FileInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: {},
    ) { }

    public ngOnInit(): void {
        this.form = new UntypedFormGroup({
            title: new UntypedFormControl(null),
            content: new UntypedFormControl(null, [Validators.required])
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

