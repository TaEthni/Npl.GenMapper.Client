import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupportDialogComponent } from './support-dialog.component';

describe('SupportDialogComponent', () => {
  let component: SupportDialogComponent;
  let fixture: ComponentFixture<SupportDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SupportDialogComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
