import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { htmlInputTypes, ValidationUtils } from '@shared/validationUtils';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-login-v2',
    templateUrl: './login-v2.component.html',
    styleUrls: ['./login-v2.component.scss']
})
export class LoginV2Component implements OnInit, AfterViewChecked {

    public form: FormGroup;
    public showError: boolean;
    public isLoading: boolean;

    @ViewChild('emailField', { static: true })
    public emailField: ElementRef;

    @ViewChild('passwordField', { static: true })
    public passwordField: ElementRef;

    constructor(
        private router: Router,
        private oauthService: OAuthService
    ) { }

    public ngOnInit(): void {
        this._createForm();
    }

    // This is a hack around a current Chrome issue, not firing events after Chrome AutoFill, on IOS
    public ngAfterViewChecked(): void {
        if (this.emailField.nativeElement.value && !this.form.get('email').value) {
            this.form.get('email').setValue(this.emailField.nativeElement.value);
            this.form.get('email').updateValueAndValidity();
        }

        if (this.passwordField.nativeElement.value && !this.form.get('password').value) {
            this.form.get('password').setValue(this.passwordField.nativeElement.value);
            this.form.get('password').updateValueAndValidity();
        }
    }

    public onSubmit(event: Event): void {
        event.preventDefault();
        this.showError = false;

        if (this.form.valid) {
            this.isLoading = true;

            const { email, password } = this.form.value;
            this.oauthService.fetchTokenUsingPasswordFlow(email, password)
                .then((resp) => {
                    // Using the loaded user data
                    let claims = this.oauthService.getIdentityClaims();
                    if (claims) console.debug('claims', claims);

                    this.isLoading = false;
                    this.router.navigate(['']);
                })
                .catch(() => {
                    this.isLoading = false;
                    this.showError = true;
                });
        }
    }

    private _createForm(): void {
        this.form = new FormGroup({
            email: new FormControl('', ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)),
            password: new FormControl('', [Validators.required])
        });
    }
}
