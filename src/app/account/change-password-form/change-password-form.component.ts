import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordDto, IdentityService } from '@npl-idp';
import {
    ControlMatchValidator,
    LowerCaseValidator,
    NumberValidator,
    SpecialCharacterValidator,
    UpperCaseValidator,
} from '@npl-shared/validators';

@Component({
    selector: 'app-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {
    public isSavingPassword: boolean = false;

    public readonly form = new FormGroup({
        oldPassword: new FormControl(null, [Validators.required]),
        newPassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            LowerCaseValidator,
            UpperCaseValidator,
            NumberValidator,
            SpecialCharacterValidator
        ]),
        confirmPassword: new FormControl(null, [
            Validators.required,
            ControlMatchValidator('newPassword')
        ])
    });

    public constructor(
        private identityService: IdentityService,
        // private translate: TranslateService,
        private snackBar: MatSnackBar
    ) { }

    public changePassword(): void {
        if (this.isSavingPassword) { return; }
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const form = this.form.getRawValue();

        const dto: ChangePasswordDto = {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword
        };

        this.isSavingPassword = true;

        this.identityService.changePassword(dto).subscribe(
            () => {
                this.isSavingPassword = false;
                this.form.reset();
                // const message = this.translate.instant('Message_PasswordChanged');
                // const button = this.translate.instant('Common_Ok');
                // this.snackBar.open(message, button, { duration: 5000 });
            },
            response => {
                this.isSavingPassword = false;
                if (response?.error?.code === 'IncorrectPassword') {
                    this.form.get('oldPassword')?.setErrors({ incorrectPassword: true });
                }
            }
        );
    }
}
