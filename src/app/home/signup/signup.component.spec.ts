import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

xdescribe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [SignupComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
