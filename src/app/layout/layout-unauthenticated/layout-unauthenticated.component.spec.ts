import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutUnauthenticatedComponent } from './layout-unauthenticated.component';

xdescribe('LayoutUnauthenticatedComponent', () => {
    let component: LayoutUnauthenticatedComponent;
    let fixture: ComponentFixture<LayoutUnauthenticatedComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [LayoutUnauthenticatedComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutUnauthenticatedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
