import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreateDialogComponent } from './team-create-dialog.component';

describe('TeamCreateDialogComponent', () => {
  let component: TeamCreateDialogComponent;
  let fixture: ComponentFixture<TeamCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TeamCreateDialogComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
