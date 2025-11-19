import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnverifiedEmailComponent } from './unverified-email.component';

xdescribe('UnverifiedEmailComponent', () => {
    let component: UnverifiedEmailComponent;
    let fixture: ComponentFixture<UnverifiedEmailComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [UnverifiedEmailComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnverifiedEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
