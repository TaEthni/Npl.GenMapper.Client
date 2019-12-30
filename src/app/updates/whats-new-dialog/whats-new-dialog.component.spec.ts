import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNewDialogComponent } from './whats-new-dialog.component';

describe('WhatsNewDialogComponent', () => {
  let component: WhatsNewDialogComponent;
  let fixture: ComponentFixture<WhatsNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
