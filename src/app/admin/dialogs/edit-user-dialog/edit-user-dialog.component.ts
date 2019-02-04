import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '@shared/entity/user.model';
import { assign } from 'lodash';

export interface EditUserConfig {
    user: User;
}

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditUserConfig
    ) {
        this.createForm();
    }

    public onSubmit(event: Event): void {
        event.preventDefault();

        if (this.form.valid && this.form.dirty) {
            this.dialogRef.close(assign(this.data.user, this.form.value));
        }
    }

    private createForm(): void {
        const user = this.data.user;

        this.form = this.fb.group({
            email: [user.email],
            username: [user.username],
        });

        this.form.controls.email.disable();
        this.form.controls.username.disable();
    }
}
