import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NodeDrawerComponent } from './node-drawer.component';
import { configureTestSuite } from 'ng-bullet';

describe.skip('NodeDrawerComponent', () => {
    let component: NodeDrawerComponent;
    let fixture: ComponentFixture<NodeDrawerComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
    declarations: [NodeDrawerComponent],
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NodeDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
