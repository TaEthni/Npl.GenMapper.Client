import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthTestingModule } from '@npl-auth/testing';
import { IdentityService } from '@npl-idp';
import { IdentityMockService } from '@npl-idp/testing';
import { TranslateTestingModule } from '@taethni/shared/localization/testing';

import { PersonalInfoComponent } from './personal-info.component';

describe('PersonalInfoComponent', () => {
    let component: PersonalInfoComponent;
    let fixture: ComponentFixture<PersonalInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        TranslateTestingModule,
        AuthTestingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [PersonalInfoComponent],
    providers: [
        { provide: IdentityService, useClass: IdentityMockService }
    ],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonalInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
