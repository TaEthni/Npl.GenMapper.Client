import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationUtils, htmlInputTypes } from '@shared/validationUtils';
import { confirmPasswordValidator } from '@shared/confirm-password.validator';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '@core/Unsubscribable';
import { Router } from '@angular/router';

export enum CreateUserError {
    usernameExists = 'usernameExists',
    emailExists = 'emailExists',
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends Unsubscribable implements OnInit {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService
    ) { super(); }

    public ngOnInit(): void {
        this.form = this.fb.group({
            username: [null, ValidationUtils.getDefaultInputValidators(htmlInputTypes.text)],
            email: [null, ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)],
            password: [null],
            confirm: [null],
        });

        this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
        this.form.controls.confirm.setValidators([Validators.required, Validators.minLength(6), confirmPasswordValidator('password')]);

        this.form.controls.password.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.form.controls.confirm.updateValueAndValidity();
            });
    }

    public onSubmit(event: Event): void {
        event.preventDefault();

        if (this.form.valid) {
            this.authService
                .signup(this.form.value)
                .subscribe(
                    success => {
                        this.router.navigate(['/login']);
                    },
                    error => {
                        if (error.error.message === CreateUserError.emailExists) {
                            this.form.controls.email.setErrors({ emailInUse: 'Email already exists' });
                        }

                        if (error.error.message === CreateUserError.usernameExists) {
                            this.form.controls.username.setErrors({ usernameInUse: 'Username already exists' });
                        }
                    }
                );
        }
    }
}
