import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodeDialogComponent } from './edit-node-dialog.component';

describe('EditNodeDialogComponent', () => {
  let component: EditNodeDialogComponent;
  let fixture: ComponentFixture<EditNodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
