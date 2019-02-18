import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { GmWorldMapToggleComponent } from './gm-world-map-toggle.component';

describe.skip('GmWorldMapToggleComponent', () => {
    let component: GmWorldMapToggleComponent;
    let fixture: ComponentFixture<GmWorldMapToggleComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GmWorldMapToggleComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GmWorldMapToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
