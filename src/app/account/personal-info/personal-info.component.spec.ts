import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
