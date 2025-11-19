import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateStreamDialogComponent } from './migrate-stream-dialog.component';

describe('MigrateStreamDialogComponent', () => {
  let component: MigrateStreamDialogComponent;
  let fixture: ComponentFixture<MigrateStreamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MigrateStreamDialogComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrateStreamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
