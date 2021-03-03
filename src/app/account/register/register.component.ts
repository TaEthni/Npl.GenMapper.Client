import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityError, IdentityService, RegistrationDto } from '@npl-idp';
import { AlphaNumericPattern } from '@npl-shared/utils';
import {
    ControlMatchValidator,
    LowerCaseValidator,
    NumberValidator,
    SpecialCharacterValidator,
    UpperCaseValidator,
} from '@npl-shared/validators';

// import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    public isLoading: boolean = false;

    public readonly form = this.fb.group({
        email: [null, [Validators.email, Validators.required]],
        userName: [null, [Validators.required, Validators.minLength(4), Validators.pattern(AlphaNumericPattern)]],
        password: [null, [
            Validators.required,
            Validators.minLength(6),
            UpperCaseValidator,
            LowerCaseValidator,
            NumberValidator,
            SpecialCharacterValidator
        ]],
        confirmPassword: [null, [
            Validators.required,
            ControlMatchValidator('password')
        ]],
    });

    public readonly userName: AbstractControl = this.form.get('userName')!;
    public readonly password: AbstractControl = this.form.get('password')!;
    public readonly confirmPassword: AbstractControl = this.form.get('confirmPassword')!;

    public constructor(
        private fb: FormBuilder,
        private router: Router,
        private identityService: IdentityService,
        // private translate: TranslateService
    ) { }

    public register(): void {
        if (this.isLoading) { return; }
        if (!this.form.valid) { return; }

        const value = this.form.getRawValue();
        const dto: RegistrationDto = {
            password: value.password,
            userName: value.userName,
            email: value.email
        };

        this.isLoading = true;
        this.identityService.register(dto).subscribe(
            success => {
                this.isLoading = false;
                this.router.navigate(['/account/register-confirm']);
            },
            error => {
                this.isLoading = false;
                this.handleRegistrationErrors(error.error);
            }
        );
    }

    private handleRegistrationErrors(errors: IdentityError[]): void {
        errors.forEach(error => {
            switch (error.code) {
                case 'DuplicateUserName':
                    this.form.get('userName')?.setErrors({ duplicateUserName: true });
                    break;
                case 'DuplicateEmail':
                    this.form.get('email')?.setErrors({ duplicateEmail: true });
                    break;
                default:
                    break;
            }
        });
    }
}
