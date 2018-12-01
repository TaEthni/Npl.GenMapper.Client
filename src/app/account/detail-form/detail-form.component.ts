import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationUtils, htmlInputTypes } from '@shared/validationUtils';
import { confirmPasswordValidator } from '@shared/confirm-password.validator';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';
import { User } from '@shared/user.model';

@Component({
    selector: 'app-detail-form',
    templateUrl: './detail-form.component.html',
    styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent extends Unsubscribable implements OnInit {
    public form: FormGroup;

    @Input()
    public model: User;

    @Output()
    public submit: EventEmitter<User> = new EventEmitter<User>();

    constructor(private fb: FormBuilder) { super(); }

    public ngOnInit(): void {
        this.form = this.fb.group({
            username: [this.model.username, ValidationUtils.getDefaultInputValidators(htmlInputTypes.text)],
            email: [this.model.email, ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)],
            password: [null],
            confirm: [null],
        });

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
        const value = this.form.value;

        if (this.form.valid) {
            if (!value.password) {
                delete value.password;
                delete value.confirm;
            }

            this.submit.emit(value);
            this.form.reset(Object.assign(value, { password: null, confirm: null }));
        }
    }
}
