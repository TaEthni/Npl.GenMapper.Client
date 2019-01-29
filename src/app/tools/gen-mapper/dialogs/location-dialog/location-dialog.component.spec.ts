import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDialogComponent } from './location-dialog.component';
import { configureTestSuite } from 'ng-bullet';

describe.skip('LocationDialogComponent', () => {
    let component: LocationDialogComponent;
    let fixture: ComponentFixture<LocationDialogComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [LocationDialogComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
