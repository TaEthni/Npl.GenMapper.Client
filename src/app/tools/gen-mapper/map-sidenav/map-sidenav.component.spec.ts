import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { MapSidenavComponent } from './map-sidenav.component';

describe.skip('MapSidenavComponent', () => {
    let component: MapSidenavComponent;
    let fixture: ComponentFixture<MapSidenavComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [MapSidenavComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapSidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
