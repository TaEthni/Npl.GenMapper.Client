import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { PeopleGroupDialogComponent } from './people-group-dialog.component';

describe.skip('PeopleGroupDialogComponent', () => {
    let component: PeopleGroupDialogComponent;
    let fixture: ComponentFixture<PeopleGroupDialogComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [PeopleGroupDialogComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PeopleGroupDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
