import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidenavToggleComponent } from './sidenav-toggle.component';

xdescribe('SidenavToggleComponent', () => {
    let component: SidenavToggleComponent;
    let fixture: ComponentFixture<SidenavToggleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [SidenavToggleComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
