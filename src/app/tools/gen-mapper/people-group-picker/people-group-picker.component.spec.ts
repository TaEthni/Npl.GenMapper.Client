import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGroupPickerComponent } from './people-group-picker.component';

describe('PeopleGroupPickerComponent', () => {
  let component: PeopleGroupPickerComponent;
  let fixture: ComponentFixture<PeopleGroupPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleGroupPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleGroupPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
