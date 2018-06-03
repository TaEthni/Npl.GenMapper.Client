import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/authentication.service';
import { ValidationUtils, htmlInputTypes } from '@shared/validationUtils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private authService: AuthenticationService
    ) { }

    public ngOnInit(): void {
        this._createForm();
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.authService.authenticate(this.form.value);
        }
    }

    public cancel(): void {

    }

    private _createForm(): void {
        this.form = new FormGroup({
            email: new FormControl('', ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)),
            password: new FormControl('', [Validators.required])
        });
    }
}
