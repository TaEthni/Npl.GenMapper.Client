import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { MapReportLegendComponent } from './map-report-legend.component';

describe.skip('MapReportLegendComponent', () => {
    let component: MapReportLegendComponent;
    let fixture: ComponentFixture<MapReportLegendComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [MapReportLegendComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapReportLegendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
