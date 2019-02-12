import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmSettingsComponent } from './gm-settings.component';

describe('GmSettingsComponent', () => {
    let component: GmSettingsComponent;
    let fixture: ComponentFixture<GmSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GmSettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GmSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
