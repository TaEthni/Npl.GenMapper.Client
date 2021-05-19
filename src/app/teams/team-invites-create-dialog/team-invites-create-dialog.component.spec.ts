import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInvitesCreateDialogComponent } from './team-invites-create-dialog.component';

describe('TeamInvitesCreateDialogComponent', () => {
  let component: TeamInvitesCreateDialogComponent;
  let fixture: ComponentFixture<TeamInvitesCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamInvitesCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInvitesCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
