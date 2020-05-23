import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDocumentViewComponent } from './no-document-view.component';

describe('NoDocumentViewComponent', () => {
  let component: NoDocumentViewComponent;
  let fixture: ComponentFixture<NoDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
