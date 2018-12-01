import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ValidationUtils, htmlInputTypes } from '@shared/validationUtils';

@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent extends Unsubscribable implements OnInit {

    public form: FormGroup;
    public success: boolean;
    public resetToken: string;

    constructor(
        private fb: FormBuilder,
        private authService: AuthenticationService
    ) { super(); }

    public ngOnInit(): void {
        this.form = this.fb.group({ email: [null, ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)] });
    }

    public onSubmit(event: Event): void {
        event.preventDefault();

        if (this.form.valid) {
            this.authService.recoverPassword(this.form.value)
                .subscribe(
                    success => {
                        this.success = true;
                        this.resetToken = success.data.token;
                    },
                    error => {
                        if (error) {
                            this.form.controls.email.setErrors({ noMatch: error.error.message });
                        }
                    }
                );
        }
    }
}
