import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenMapperContainerComponent } from './gen-mapper-container.component';

describe('GenMapperContainerComponent', () => {
  let component: GenMapperContainerComponent;
  let fixture: ComponentFixture<GenMapperContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenMapperContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenMapperContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
