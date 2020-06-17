import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDialogComponent } from './people-dialog.component';

describe('PeopleDialogComponent', () => {
  let component: PeopleDialogComponent;
  let fixture: ComponentFixture<PeopleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
