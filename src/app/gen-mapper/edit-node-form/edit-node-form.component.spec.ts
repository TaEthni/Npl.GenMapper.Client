import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodeFormComponent } from './edit-node-form.component';

describe('EditNodeFormComponent', () => {
  let component: EditNodeFormComponent;
  let fixture: ComponentFixture<EditNodeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNodeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
