import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { TranslateTestingModule } from '@taethni/shared/localization/testing';

import { PasswordRequirementsComponent } from './password-requirements.component';

describe('PasswordRequirementsComponent', () => {
    let component: PasswordRequirementsComponent;
    let fixture: ComponentFixture<PasswordRequirementsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [
        TranslateTestingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [PasswordRequirementsComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordRequirementsComponent);
        component = fixture.componentInstance;
        component.control = new UntypedFormControl();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
