import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects, authReducer, AuthState } from '@npl-auth';

import { InviteEffects } from './invite/effect';
import { invitesReducer } from './invite/reducer';
import { InviteState } from './invite/state';
import { SelfEffects, selfReducer, SelfState } from './self';
import { TeamMemberEffects } from './team-member/effects';
import { teamMembersReducer } from './team-member/reducer';
import { TeamMemberState } from './team-member/state';
import { TeamEffects } from './team/effects';
import { teamsReducer } from './team/reducer';
import { TeamState } from './team/state';

export interface AppState {
    auth: AuthState;
    self: SelfState;
    teams: TeamState;
    teamMembers: TeamMemberState;
    invites: InviteState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    self: selfReducer,
    teams: teamsReducer,
    teamMembers: teamMembersReducer,
    invites: invitesReducer
};

export const appEffects = [
    AuthEffects,
    SelfEffects,
    TeamEffects,
    TeamMemberEffects,
    InviteEffects
];
