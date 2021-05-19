import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInvitesComponent } from './team-invites.component';

describe('TeamInvitesComponent', () => {
  let component: TeamInvitesComponent;
  let fixture: ComponentFixture<TeamInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamInvitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
