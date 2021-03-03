import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@npl-core/authentication.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { confirmPasswordValidator } from '@npl-shared/confirm-password.validator';
import { htmlInputTypes, ValidationUtils } from '@npl-shared/validationUtils';
import { takeUntil } from 'rxjs/operators';

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
            username: [null, ValidationUtils.getDefaultInputValidators(htmlInputTypes.text).concat(Validators.minLength(4))],
            email: [null, ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)],
            password: [null],
            confirm: [null],
        });

        this.form.controls.password.setValidators([Validators.required, Validators.minLength(8)]);
        this.form.controls.confirm.setValidators([Validators.required, Validators.minLength(8), confirmPasswordValidator('password')]);

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
                        if (error.error.errorCode === 40901) {
                            this.form.controls.email.setErrors({ emailInUse: 'Email already exists' });
                        }

                        if (error.error.errorCode === 40902) {
                            this.form.controls.username.setErrors({ usernameInUse: 'Username already exists' });
                        }
                    }
                );
        }
    }
}
