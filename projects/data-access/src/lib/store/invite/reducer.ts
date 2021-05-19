import { Action, createReducer, on } from '@ngrx/store';

import { InviteApiActions, InviteUiActions } from './actions';
import { initialInviteState, InviteState } from './state';

const _invitesReducer = createReducer<InviteState>(
    initialInviteState,
    // =============
    // Load Team Invites
    on(InviteUiActions.loadTeamInvites, (state, action): InviteState => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(InviteApiActions.loadTeamInvitesSuccess, (state, action): InviteState => {
        const filtered = state.entities.filter(x => x.teamId !== action.teamId);
        return {
            ...state,
            entities: [...filtered, ...action.entities],
            isLoading: false,
            error: ''
        };
    }),
    on(InviteApiActions.loadTeamInvitesFailure, (state, action): InviteState => {
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
    }),

    // =============
    // Send Tenant Invites
    on(InviteUiActions.sendInvites, (state, action): InviteState => {
        return {
            ...state,
            isCreating: true,
        };
    }),
    on(InviteApiActions.sendInvitesSuccess, (state, action): InviteState => {
        return {
            ...state,
            entities: [...state.entities, ...action.entities],
            isCreating: false,
            unsentInvites: null,
            error: ''
        };
    }),
    on(InviteApiActions.sendInvitesPartialSuccess, (state, action): InviteState => {
        return {
            ...state,
            entities: [...state.entities, ...action.sentInvites],
            isCreating: false,
            sentInvites: action.sentInvites,
            unsentInvites: action.unsentInvites,
            error: action.error
        };
    }),
    on(InviteApiActions.sendInvitesFailure, (state, action): InviteState => {
        return {
            ...state,
            isCreating: false,
            unsentInvites: null,
            error: action.error
        };
    }),
    on(InviteUiActions.clearInviteSendingState, (state, action): InviteState => {
        return {
            ...state,
            isCreating: false,
            unsentInvites: null,
            sentInvites: null,
            error: ''
        };
    }),

    // ==================
    // Cancel Invite
    on(InviteUiActions.cancelInvite, (state, action): InviteState => {
        return {
            ...state,
            isDeleting: true,
        };
    }),
    on(InviteApiActions.cancelInviteSuccess, (state, action): InviteState => {
        const entities = state.entities.filter(x => x.id !== action.inviteId);
        return {
            ...state,
            entities,
            isDeleting: false,
            error: ''
        };
    }),
    on(InviteApiActions.cancelInviteFailure, (state, action): InviteState => {
        return {
            ...state,
            isDeleting: false,
            error: action.error
        };
    }),


    // ==================
    // Resend Invite
    on(InviteUiActions.resendInvite, (state, action): InviteState => {
        return {
            ...state,
            isUpdating: true,
        };
    }),
    on(InviteApiActions.resendInviteSuccess, (state, action): InviteState => {
        const entities = state.entities.map(x => x.id === action.invite.id ? action.invite : x);
        return {
            ...state,
            entities: entities,
            isUpdating: false,
            error: ''
        };
    }),
    on(InviteApiActions.resendInviteFailure, (state, action): InviteState => {
        return {
            ...state,
            isUpdating: false,
            error: action.error
        };
    }),
);



export function invitesReducer(state: InviteState, action: Action): any {
    return _invitesReducer(state, action);
}
