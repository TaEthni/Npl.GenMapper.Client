import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { IdentityService } from '@npl-idp';
import { IdentityMockService } from '@npl-idp/testing';
import { TranslateTestingModule } from '@taethni/shared/localization/testing';
import { of, Subject, throwError } from 'rxjs';

import { ChangePasswordFormComponent } from './change-password-form.component';

describe('ChangePasswordFormComponent', () => {
    let component: ChangePasswordFormComponent;
    let fixture: ComponentFixture<ChangePasswordFormComponent>;
    let identityService: IdentityService;
    let snackBar: MatSnackBar;
    let translate: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        TranslateTestingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ChangePasswordFormComponent],
    providers: [
        { provide: IdentityService, useClass: IdentityMockService },
        {
            provide: MatSnackBar,
            useValue: {
                open: jest.fn()
            }
        }
    ],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordFormComponent);
        component = fixture.componentInstance;
        identityService = TestBed.inject(IdentityService);
        snackBar = TestBed.inject(MatSnackBar);
        translate = TestBed.inject(TranslateService);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should create form', () => {
        fixture.detectChanges();
        expect(component.form.get('oldPassword')).toBeTruthy();
        expect(component.form.get('newPassword')).toBeTruthy();
        expect(component.form.get('confirmPassword')).toBeTruthy();
    });

    it('should mark all controls as touched if the changePassword button is clicked and the form is invalid', () => {
        // Arrange
        fixture.detectChanges();
        component.form.markAllAsTouched = jest.fn();

        // Act
        component.changePassword();

        // Assert
        expect(component.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('should set noMatch error if newPassword and confirmPassword do not match', () => {
        // Arrange
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: '1234',
            newPassword: '1234@Test',
            confirmPassword: '12345@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(component.form.get('confirmPassword')?.errors?.noMatch).toBeTruthy();
    });

    it('should not use the IdentityService to update password if the form is invalid', () => {
        // Arrange
        identityService.changePassword = jest.fn(() => of(null)) as any;
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: null,
            newPassword: '1234@Test',
            confirmPassword: '12345@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(identityService.changePassword).not.toHaveBeenCalled();
    });

    it('should set isSavingPassword to true when changingPassword', () => {
        // Arrange
        const subject = new Subject();
        identityService.changePassword = jest.fn(() => subject.asObservable()) as any;
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: 'example',
            newPassword: '1234@Test',
            confirmPassword: '1234@Test'
        });

        // Act
        component.changePassword();
        expect(component.isSavingPassword).toBeTruthy();

        // Clean
        subject.next();
        subject.complete();
    });

    it('should use the IdentityService to changePassword', () => {
        // Arrange
        identityService.changePassword = jest.fn(() => of(null)) as any;
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: '1234@Example',
            newPassword: '1234@Test',
            confirmPassword: '1234@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(identityService.changePassword).toHaveBeenCalledWith({
            oldPassword: '1234@Example',
            newPassword: '1234@Test'
        });
    });

    it('should set isSavingPassword to false when the changePassword request is successful', () => {
        // Arrange
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: 'example',
            newPassword: '1234@Test',
            confirmPassword: '1234@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(component.isSavingPassword).toBeFalsy();
    });

    it('should set isSavingPassword to false when the changePassword request throws', () => {
        // Arrange
        identityService.changePassword = jest.fn(() => throwError(null)) as any;
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: 'example',
            newPassword: '1234@Test',
            confirmPassword: '1234@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(component.isSavingPassword).toBeFalsy();
    });

    it('should reset the form if the changePassword request is successful', () => {
        // Arrange
        component.form.reset = jest.fn();
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: 'example',
            newPassword: '1234@Test',
            confirmPassword: '1234@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(component.form.reset).toHaveBeenCalled();
    });

    it('should display a snackBar if the changePassword request is successful', () => {
        // Arrange
        const message = translate.instant('Message_PasswordChanged');
        const button = translate.instant('Common_Ok');
        const duration = 5000;
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: 'example',
            newPassword: '1234@Test',
            confirmPassword: '1234@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(snackBar.open).toHaveBeenCalledWith(message, button, { duration });
    });

    it('should set incorrectPassword error on oldPassword if the request fails with error "IncorrectPassword"', () => {
        // Arrange
        const response = { error: { code: 'IncorrectPassword' } };
        identityService.changePassword = jest.fn(() => throwError(response)) as any;
        fixture.detectChanges();
        component.form.patchValue({
            oldPassword: 'example',
            newPassword: '1234@Test',
            confirmPassword: '1234@Test'
        });

        // Act
        component.changePassword();

        // Assert
        expect(component.form.get('oldPassword')?.errors?.incorrectPassword).toBeTruthy();
    });
});
