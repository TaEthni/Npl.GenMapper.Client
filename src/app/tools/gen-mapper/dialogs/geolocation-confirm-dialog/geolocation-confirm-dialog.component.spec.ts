import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationConfirmDialog } from './geolocation-confirm-dialog.component';

describe('GeolocationConfirmDialog', () => {
    let component: GeolocationConfirmDialog;
    let fixture: ComponentFixture<GeolocationConfirmDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GeolocationConfirmDialog]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GeolocationConfirmDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
