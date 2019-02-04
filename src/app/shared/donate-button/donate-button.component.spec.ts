import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateButtonComponent } from './donate-button.component';

describe.skip('DonateButtonComponent', () => {
    let component: DonateButtonComponent;
    let fixture: ComponentFixture<DonateButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DonateButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DonateButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
