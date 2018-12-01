import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NplLogoComponent } from './npl-logo.component';

describe('NplLogoComponent', () => {
  let component: NplLogoComponent;
  let fixture: ComponentFixture<NplLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NplLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NplLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
