import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolNavListComponent } from './tool-nav-list.component';

xdescribe('ToolNavListComponent', () => {
    let component: ToolNavListComponent;
    let fixture: ComponentFixture<ToolNavListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolNavListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolNavListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
