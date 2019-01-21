import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUnauthenticatedComponent } from './layout-unauthenticated.component';

xdescribe('LayoutUnauthenticatedComponent', () => {
    let component: LayoutUnauthenticatedComponent;
    let fixture: ComponentFixture<LayoutUnauthenticatedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutUnauthenticatedComponent]
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
