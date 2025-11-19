import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { PeopleGroupPickerComponent } from './people-group-picker.component';

describe.skip('PeopleGroupPickerComponent', () => {
    let component: PeopleGroupPickerComponent;
    let fixture: ComponentFixture<PeopleGroupPickerComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
    declarations: [PeopleGroupPickerComponent],
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PeopleGroupPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
