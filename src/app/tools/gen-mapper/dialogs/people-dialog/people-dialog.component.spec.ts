import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PeopleDialogComponent } from './people-dialog.component';

describe('PeopleDialogComponent', () => {
  let component: PeopleDialogComponent;
  let fixture: ComponentFixture<PeopleDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PeopleDialogComponent],
    teardown: { destroyAfterEach: false }
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
