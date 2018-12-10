import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidationUtils, htmlInputTypes } from '@shared/validationUtils';
import { confirmPasswordValidator } from '@shared/confirm-password.validator';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';
import { User } from '@shared/user.model';
import { Observable, of } from 'rxjs';
import { AccountService } from '@core/account.service';

@Component({
    selector: 'app-detail-form',
    templateUrl: './detail-form.component.html',
    styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent extends Unsubscribable implements OnInit {
    public isSaving: boolean;
    public form: FormGroup;

    @Input()
    public model: User;

    @Output()
    public submit: EventEmitter<User> = new EventEmitter<User>();

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService
    ) { super(); }

    public ngOnInit(): void {
        this.form = this.fb.group({
            username: [this.model.username, ValidationUtils.getDefaultInputValidators(htmlInputTypes.text)],
            email: [this.model.email, ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)],
            password: [null],
            confirm: [null],
        });

        // Temp disabled unitl logout issue is fixed
        this.form.get('email').disable();

        this.form.controls.password.setValidators([Validators.minLength(6)]);

        this.form.controls.password.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                if (result) {
                    this.form.controls.confirm.setValidators([
                        Validators.required, Validators.minLength(6), confirmPasswordValidator('password')
                    ]);
                } else {
                    this.form.controls.confirm.setValidators([]);
                }

                this.form.controls.confirm.updateValueAndValidity();
            });
    }

    public onSubmit(event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        const value = this.form.value;

        this.isSaving = true;

        this.validateUsername(value.username).subscribe((usernameAvailable) => {
            this.isSaving = false;

            if (!usernameAvailable) {
                this.form.get('username').setErrors({ usernameInUse: true });
                return;
            }

            if (this.form.valid) {
                if (!value.password) {
                    delete value.password;
                    delete value.confirm;
                }

                this.submit.emit(value);
                this.form.reset(Object.assign(value, { password: null, confirm: null }));
            }
        });
    }

    private validateUsername(username: string): Observable<boolean> {
        if (username === this.model.username) {
            return of(true);
        }

        return this.accountService.checkUsernameAvailability(username);
    }
}
