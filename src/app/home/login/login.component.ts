import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { htmlInputTypes, ValidationUtils } from '@shared/validationUtils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {

    public form: FormGroup;
    public showError: boolean;
    public isLoading: boolean;

    @ViewChild('emailField')
    public emailField: ElementRef;

    @ViewChild('passwordField')
    public passwordField: ElementRef;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
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
            this.authService.authenticate(this.form.value).subscribe(
                success => {
                    this.isLoading = false;
                    this.router.navigate(['']);
                },
                error => {
                    this.isLoading = false;
                    this.showError = true;
                }
            );
        }
    }

    private _createForm(): void {
        this.form = new FormGroup({
            email: new FormControl('', ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)),
            password: new FormControl('', [Validators.required])
        });
    }
}
