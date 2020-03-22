import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGroupSelectorDialogComponent } from './people-group-selector-dialog.component';

describe('PeopleGroupSelectorDialogComponent', () => {
  let component: PeopleGroupSelectorDialogComponent;
  let fixture: ComponentFixture<PeopleGroupSelectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleGroupSelectorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleGroupSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
