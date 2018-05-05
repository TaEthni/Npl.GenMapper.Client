import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenMapComponent } from './gen-map.component';

describe('GenMapComponent', () => {
  let component: GenMapComponent;
  let fixture: ComponentFixture<GenMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
