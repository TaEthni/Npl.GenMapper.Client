import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/authentication.service';
import { ValidationUtils, htmlInputTypes } from '@shared/validationUtils';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form: FormGroup;
    public showError: boolean;
    public isLoading: boolean;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this._createForm();
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
