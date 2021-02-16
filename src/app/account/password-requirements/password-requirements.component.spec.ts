import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
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
            declarations: [PasswordRequirementsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordRequirementsComponent);
        component = fixture.componentInstance;
        component.control = new FormControl();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
