import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { MapNameControlComponent } from './map-name-control.component';

describe.skip('MapNameControlComponent', () => {
    let component: MapNameControlComponent;
    let fixture: ComponentFixture<MapNameControlComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [MapNameControlComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapNameControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
