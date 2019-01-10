import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolOfflineComponent } from './tool-offline.component';

xdescribe('ToolOfflineComponent', () => {
    let component: ToolOfflineComponent;
    let fixture: ComponentFixture<ToolOfflineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolOfflineComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolOfflineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
