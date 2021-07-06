import { createAction, props } from '@ngrx/store';

import { InvitesCreateDto } from '../../dtos';
import { Invite } from '../../models/Invite';

export const InviteUiActions = {
    loadTeamInvites: createAction(
        '[Invite UI] Load Team Invites',
        props<{ teamId: string }>()
    ),

    sendInvites: createAction(
        '[Invite UI] Send Invites',
        props<{ dto: InvitesCreateDto }>()
    ),

    cancelInvite: createAction(
        '[Invite UI] Cancel Invite',
        props<{ id: string }>()
    ),

    resendInvite: createAction(
        '[Invite UI] Resend Invite',
        props<{ id: string }>()
    ),

    clearInviteSendingState: createAction(
        '[Invite UI] Clear Sending State'
    )
};

export const InviteApiActions = {
    loadTeamInvitesSuccess: createAction(
        '[Invite API] Load Team Invite Success',
        props<{ entities: Invite[], teamId: string }>()
    ),
    loadTeamInvitesFailure: createAction(
        '[Invite API] Load Team Invite Failure',
        props<{ error: string }>()
    ),

    sendInvitesSuccess: createAction(
        '[Invite API] Send Invites Success',
        props<{ entities: Invite[] }>()
    ),
    sendInvitesPartialSuccess: createAction(
        '[Invite API] Send Invites Partial Success',
        props<{ error: string, sentInvites: Invite[], unsentInvites: string[] }>()
    ),
    sendInvitesFailure: createAction(
        '[Invite Api] Send Invites Failure',
        props<{ error: string }>()
    ),

    cancelInviteSuccess: createAction(
        '[Invite Api] Cancel Invite Success',
        props<{ inviteId: string }>()
    ),
    cancelInviteFailure: createAction(
        '[Invite Api] Cancel Invite Failure',
        props<{ error: string }>()
    ),

    resendInviteSuccess: createAction(
        '[Invite Api] ReSend Invite Success',
        props<{ invite: Invite }>()
    ),
    resendInviteFailure: createAction(
        '[Invite Api] ReSend Invite Failure',
        props<{ error: string }>()
    )
};
