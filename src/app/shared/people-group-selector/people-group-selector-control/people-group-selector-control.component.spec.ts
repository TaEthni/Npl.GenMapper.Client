import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGroupSelectorControlComponent } from './people-group-selector-control.component';

describe('PeopleGroupSelectorControlComponent', () => {
  let component: PeopleGroupSelectorControlComponent;
  let fixture: ComponentFixture<PeopleGroupSelectorControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleGroupSelectorControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleGroupSelectorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
