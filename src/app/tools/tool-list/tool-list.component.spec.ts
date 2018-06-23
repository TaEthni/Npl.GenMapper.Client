import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolListComponent } from './tool-list.component';

describe('ToolListComponent', () => {
    let component: ToolListComponent;
    let fixture: ComponentFixture<ToolListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
