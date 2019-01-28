import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDrawerComponent } from './node-drawer.component';

describe('NodeDrawerComponent', () => {
    let component: NodeDrawerComponent;
    let fixture: ComponentFixture<NodeDrawerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NodeDrawerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NodeDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
