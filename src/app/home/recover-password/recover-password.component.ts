import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@core/authentication.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { htmlInputTypes, ValidationUtils } from '@shared/validationUtils';

@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent extends Unsubscribable implements OnInit {

    public form: FormGroup;
    public success: boolean;
    public isLoading: boolean;

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
            this.isLoading = true;
            this.authService.recoverPassword(this.form.value)
                .subscribe(
                    success => {
                        this.success = true;
                        this.isLoading = false;
                    },
                    error => {
                        this.isLoading = false;
                        if (error.error.errorCode === 40407) {
                            this.form.controls.email.setErrors({ noMatch: error.error.message });
                        }
                    }
                );
        }
    }
}
