import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DonateButtonComponent } from './donate-button.component';

describe.skip('DonateButtonComponent', () => {
    let component: DonateButtonComponent;
    let fixture: ComponentFixture<DonateButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [DonateButtonComponent],
    teardown: { destroyAfterEach: false }
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
