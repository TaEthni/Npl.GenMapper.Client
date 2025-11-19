import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { CountryPickerComponent } from './country-picker.component';

describe.skip('CountryPickerComponent', () => {
    let component: CountryPickerComponent;
    let fixture: ComponentFixture<CountryPickerComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
    declarations: [CountryPickerComponent],
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CountryPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
