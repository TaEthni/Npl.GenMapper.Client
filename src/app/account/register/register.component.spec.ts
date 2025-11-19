import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@npl-auth';
import { IdentityService } from '@npl-idp';
import { IdentityMockService } from '@npl-idp/testing';
import { TranslateTestingModule } from '@taethni/shared/localization/testing';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';

const validModel = {
    userName: 'mySimpleUsername',
    email: 'test@test.com',
    password: '1234TTTttt#',
    confirmPassword: '1234TTTttt#'
};

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let http: HttpClient;
    let identityService: IdentityService;
    let router: Router;
    let translate: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [RegisterComponent],
    providers: [
        {
            provide: IdentityService,
            useClass: IdentityMockService
        },
        {
            provide: Router,
            useValue: {
                navigate: jest.fn()
            }
        },
        {
            provide: AuthService,
            useValue: {
                login: jest.fn()
            }
        }
    ],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        http = TestBed.inject(HttpClient);
        router = TestBed.inject(Router);
        identityService = TestBed.inject(IdentityService);
        translate = TestBed.inject(TranslateService);
    });

    it('should initialize', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should create a form with registration controls', () => {
        fixture.detectChanges();
        expect(component.form.get('userName')).toBeInstanceOf(AbstractControl);
        expect(component.form.get('email')).toBeInstanceOf(AbstractControl);
        expect(component.form.get('password')).toBeInstanceOf(AbstractControl);
        expect(component.form.get('confirmPassword')).toBeInstanceOf(AbstractControl);
    });

    describe('UserName form control', () => {
        let userName: AbstractControl;

        beforeEach(() => {
            userName = component.form.get('userName')!;
        });

        it('should require userName', () => {
            fixture.detectChanges();
            userName.setValue(null);
            expect(userName.invalid).toBeTruthy();
            expect(userName?.errors?.required).toBeTruthy();
        });

        it('should not allow userName to have special characters', () => {
            fixture.detectChanges();
            userName.setValue('myCoolUserName&');
            expect(userName.invalid).toBeTruthy();
            expect(userName?.errors?.pattern).toBeTruthy();
        });
    });

    describe('Email form control', () => {
        let email: AbstractControl;

        beforeEach(() => {
            email = component.form.get('email')!;
        });

        it('should require email', () => {
            fixture.detectChanges();
            email.setValue(null);
            expect(email.invalid).toBeTruthy();
            expect(email?.errors?.required).toBeTruthy();
        });

        it('should require email formatting', () => {
            fixture.detectChanges();
            email.setValue('myCoolEmail&');
            expect(email.invalid).toBeTruthy();
            expect(email?.errors?.email).toBeTruthy();
        });
    });

    describe('Password form control', () => {
        let password: AbstractControl;

        beforeEach(() => {
            password = component.form.get('password')!;
        });

        it('should require password', () => {
            fixture.detectChanges();
            password.setValue(null);
            expect(password.invalid).toBeTruthy();
            expect(password?.errors?.required).toBeTruthy();
        });

        it('should require numbers', () => {
            fixture.detectChanges();
            password.setValue('myCoolEmail&');
            expect(password?.errors?.number).toBeTruthy();
        });

        it('should require 1 LowerCase', () => {
            fixture.detectChanges();
            password.setValue('124COOL#');
            expect(password?.errors?.lowerCase).toBeTruthy();
        });

        it('should require 1 UpperCase', () => {
            fixture.detectChanges();

            password.setValue('124cool#');
            expect(password?.errors?.upperCase).toBeTruthy();
        });

        it('should require At least 6 characters', () => {
            fixture.detectChanges();

            password.setValue('1Co#');
            expect(password?.errors?.minlength).toBeTruthy();
        });

        it('should require At least 1 special Character', () => {
            fixture.detectChanges();

            password.setValue('3416Test');
            expect(password?.errors?.specialCharacter).toBeTruthy();
        });

        it('should require all formatting', () => {
            fixture.detectChanges();

            password.setValue('lowerUpper1234##');
            expect(password?.errors?.pattern).toBeFalsy();
        });
    });

    describe('OnRegister', () => {
        it('should not try to make http request if form is invalid', () => {
            fixture.detectChanges();
            component.register();
            expect(identityService.register).not.toHaveBeenCalled();
        });

        it('should not try to make http request if passwords do not match', () => {
            fixture.detectChanges();

            component.form.patchValue({
                userName: 'mySimpleUsername',
                email: 'test@test.com',
                password: '1234TTTttt#',
                confirmPassword: '1234TTTttt##',
            });

            component.register();
            expect(identityService.register).not.toHaveBeenCalled();
        });

        it('should set errors on password control if passwords do not match', () => {
            fixture.detectChanges();

            component.form.patchValue({
                userName: 'mySimpleUsername',
                email: 'test@test.com',
                password: '1234TTTttt#',
                confirmPassword: '1234TTTttt##',
            });

            component.register();

            expect(component.confirmPassword?.errors?.noMatch).toBeTruthy();
        });

        it('should post user form without confirmPassword if form is valid', () => {
            fixture.detectChanges();

            component.form.patchValue(validModel);

            component.register();

            const value = component.form.getRawValue();
            delete value.confirmPassword;

            expect(identityService.register).toHaveBeenCalledWith(value);
        });

        it('should call router.navigate after registration is complete', () => {
            fixture.detectChanges();
            http.post = () => of(null) as any;
            spyOn(router, 'navigate').and.callThrough();
            component.form.patchValue(validModel);
            component.register();
            expect(router.navigate).toHaveBeenCalledWith(['/account/register-confirm']);
        });
    });

    describe('OnRegister Errors', () => {
        beforeEach(() => {
            spyOn(router, 'navigate').and.callThrough();
        });

        it('should set duplicateUserName error if there is a duplicate userName', () => {

            identityService.register = jest.fn(() => throwError(new HttpErrorResponse({
                error: [
                    { code: 'DuplicateUserName', description: '' }
                ]
            })));

            fixture.detectChanges();
            component.form.patchValue(validModel);
            component.register();
            expect(router.navigate).not.toHaveBeenCalled();
            expect(component.form.get('userName')?.errors?.duplicateUserName).toBeTruthy();
        });
    });
});
