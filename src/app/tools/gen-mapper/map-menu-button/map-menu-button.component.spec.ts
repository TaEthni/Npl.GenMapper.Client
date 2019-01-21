import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { MapMenuButtonComponent } from './map-menu-button.component';

describe.skip('MapMenuButtonComponent', () => {
    let component: MapMenuButtonComponent;
    let fixture: ComponentFixture<MapMenuButtonComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [MapMenuButtonComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapMenuButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
