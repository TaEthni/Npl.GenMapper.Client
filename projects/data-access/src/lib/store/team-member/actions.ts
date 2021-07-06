import { createAction, props } from '@ngrx/store';

import { TeamMembersInviteDto, TeamMemberUpdateDto } from '../../dtos';
import { TeamMember } from '../../models';

export const TeamMemberUiActions = {
    loadMembersForTeam: createAction(
        '[TeamMember UI] Load Members By Team',
        props<{ teamId: string }>()
    ),

    invite: createAction(
        '[TeamMember UI] Invite TeamMember',
        props<{ dto: TeamMembersInviteDto, onComplete?: () => void }>()
    ),

    update: createAction(
        '[TeamMember UI] Update TeamMember',
        props<{ teamId: string, id: string, dto: TeamMemberUpdateDto, onComplete?: () => void }>()
    ),

    remove: createAction(
        '[TeamMember UI] Remove TeamMember',
        props<{ teamId: string, id: string, onComplete?: () => void }>()
    ),
};

export const TeamMemberApiActions = {
    loadMembersForTeamSuccess: createAction(
        '[TeamMember API] Load Members By Team Success',
        props<{ entities: TeamMember[], teamId: string }>()
    ),
    loadMembersForTeamFailure: createAction(
        '[TeamMember API] Load Members By Team Failure',
        props<{ error: string }>()
    ),

    inviteSuccess: createAction(
        '[TeamMember API] Invite TeamMember Success',
        props<{ entity: TeamMember }>()
    ),
    inviteFailure: createAction(
        '[TeamMember API] Invite TeamMember Failure',
        props<{ error: string }>()
    ),

    updateSuccess: createAction(
        '[TeamMember API] Update TeamMember Success',
        props<{ entity: TeamMember }>()
    ),
    updateFailure: createAction(
        '[TeamMember API] Update TeamMember Failure',
        props<{ error: string }>()
    ),

    removeSuccess: createAction(
        '[TeamMember API] Remove Success',
        props<{ id: string }>()
    ),
    removeFailure: createAction(
        '[TeamMember API] Remove Failure',
        props<{ error: string }>()
    ),
};
