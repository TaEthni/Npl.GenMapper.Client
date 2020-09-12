import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDialogV1Component } from './support-dialog-v1.component';

xdescribe('SupportDialogV1Component', () => {
    let component: SupportDialogV1Component;
    let fixture: ComponentFixture<SupportDialogV1Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupportDialogV1Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupportDialogV1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
