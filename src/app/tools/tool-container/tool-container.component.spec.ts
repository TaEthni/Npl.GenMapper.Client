import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolContainerComponent } from './tool-container.component';

xdescribe('ToolContainerComponent', () => {
    let component: ToolContainerComponent;
    let fixture: ComponentFixture<ToolContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
