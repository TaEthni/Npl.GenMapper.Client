import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailComponent } from './confirm-email.component';
import { configureTestSuite } from 'ng-bullet';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalePipe } from '@shared/locale.pipe';

describe('ConfirmEmailComponent', () => {
    let component: ConfirmEmailComponent;
    let fixture: ComponentFixture<ConfirmEmailComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                ConfirmEmailComponent,
                LocalePipe
            ]
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
