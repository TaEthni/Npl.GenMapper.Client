import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmElementsComponent } from './gm-elements.component';

describe('GmElementsComponent', () => {
  let component: GmElementsComponent;
  let fixture: ComponentFixture<GmElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
