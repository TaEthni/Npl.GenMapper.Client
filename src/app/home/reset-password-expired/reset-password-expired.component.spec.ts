import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResetPasswordExpiredComponent } from './reset-password-expired.component';

xdescribe('ResetPasswordExpiredComponent', () => {
    let component: ResetPasswordExpiredComponent;
    let fixture: ComponentFixture<ResetPasswordExpiredComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResetPasswordExpiredComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordExpiredComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
