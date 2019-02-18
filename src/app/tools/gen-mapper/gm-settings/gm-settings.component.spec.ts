import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmSettingsComponent } from './gm-settings.component';
import { configureTestSuite } from 'ng-bullet';

describe.skip('GmSettingsComponent', () => {
    let component: GmSettingsComponent;
    let fixture: ComponentFixture<GmSettingsComponent>;

    configureTestSuite(() => {

        TestBed.configureTestingModule({
            declarations: [GmSettingsComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GmSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
