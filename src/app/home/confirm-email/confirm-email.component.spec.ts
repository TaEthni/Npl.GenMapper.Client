import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailComponent } from './confirm-email.component';
import { configureTestSuite } from 'ng-bullet';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfirmEmailComponent', () => {
    let component: ConfirmEmailComponent;
    let fixture: ComponentFixture<ConfirmEmailComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [ConfirmEmailComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
