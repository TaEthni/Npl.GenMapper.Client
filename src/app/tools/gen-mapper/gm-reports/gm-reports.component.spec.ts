import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { GmReportsComponent } from './gm-reports.component';

describe.skip('GmReportsComponent', () => {
    let component: GmReportsComponent;
    let fixture: ComponentFixture<GmReportsComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GmReportsComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GmReportsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
