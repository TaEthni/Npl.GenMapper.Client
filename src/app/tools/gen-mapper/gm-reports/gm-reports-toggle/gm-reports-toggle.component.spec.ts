import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { GmReportsToggleComponent } from './gm-reports-toggle.component';

describe.skip('GmReportsToggleComponent', () => {
    let component: GmReportsToggleComponent;
    let fixture: ComponentFixture<GmReportsToggleComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GmReportsToggleComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GmReportsToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
