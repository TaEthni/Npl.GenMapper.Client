import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGroupSelectorComponent } from './people-group-selector.component';

describe('PeopleGroupSelectorComponent', () => {
  let component: PeopleGroupSelectorComponent;
  let fixture: ComponentFixture<PeopleGroupSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleGroupSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
