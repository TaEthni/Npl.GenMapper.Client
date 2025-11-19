import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { ToolsComponent } from './tools.component';

describe.skip('ToolsComponent', () => {
    let component: ToolsComponent;
    let fixture: ComponentFixture<ToolsComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
    declarations: [ToolsComponent],
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
