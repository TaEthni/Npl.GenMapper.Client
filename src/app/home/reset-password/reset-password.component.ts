import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@core/authentication.service';
import { confirmPasswordValidator } from '@shared/confirm-password.validator';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends Unsubscribable implements OnInit {

    public form: FormGroup;
    public key: string;
    public passwordChanged: boolean;

    constructor(
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
    ) { super(); }

    public ngOnInit(): void {
        this.key = this.route.snapshot.queryParams.key;
        this.authService.checkResetPasswordToken(this.key)
            .subscribe(
                success => {
                    this.createForm();
                },
                error => {
                    const errorCode = error.error.errorCode;

                    if (errorCode === 40015) {
                        this.router.navigate(['/reset-password-expired']);
                    } else {
                        this.router.navigate(['/notfound']);
                    }
                }
            );
    }

    public createForm(): void {
        this.form = this.fb.group({
            password: [null],
            confirm: [null]
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
                .resetPassword(this.key, this.form.value.password)
                .subscribe(result => {
                    this.passwordChanged = true;
                });
        }
    }
}
