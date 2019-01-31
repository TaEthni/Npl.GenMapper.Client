import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGroupDialogComponent } from './people-group-dialog.component';

describe('PeopleGroupDialogComponent', () => {
  let component: PeopleGroupDialogComponent;
  let fixture: ComponentFixture<PeopleGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
