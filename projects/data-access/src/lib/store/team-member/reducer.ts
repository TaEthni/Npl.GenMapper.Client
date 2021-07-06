import { Action, createReducer, on } from '@ngrx/store';

import { TeamMemberApiActions, TeamMemberUiActions } from './actions';
import { initialTeamMemberState, TeamMemberState } from './state';

const _teamMembersReducer = createReducer<TeamMemberState>(
    initialTeamMemberState,

    // Load TeamMembers
    on(TeamMemberUiActions.loadMembersForTeam, (state, action): TeamMemberState => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(TeamMemberApiActions.loadMembersForTeamSuccess, (state, action): TeamMemberState => {
        const last = state.entities.filter(x => x.teamId !== action.teamId);
        const entities = [...last, ...action.entities];

        return {
            ...state,
            isLoading: false,
            error: null,
            entities: entities
        };
    }),
    on(TeamMemberApiActions.loadMembersForTeamFailure, (state, action): TeamMemberState => {
        return {
            ...state,
            isLoading: false,
            error: action.error,
        };
    }),


    // Create TeamMember
    // on(TeamMemberUiActions.create, (state, action): TeamMemberState => {
    //     return {
    //         ...state,
    //         isCreating: true
    //     };
    // }),
    // on(TeamMemberApiActions.createSuccess, (state, action): TeamMemberState => {
    //     return {
    //         ...state,
    //         isCreating: false,
    //         error: null,
    //         entities: [...state.entities, action.entity]
    //     };
    // }),
    // on(TeamMemberApiActions.createFailure, (state, action): TeamMemberState => {
    //     return {
    //         ...state,
    //         isCreating: false,
    //         error: action.error,
    //     };
    // }),

    // Update TeamMember
    on(TeamMemberUiActions.update, (state, action): TeamMemberState => {
        return {
            ...state,
            isUpdating: true
        };
    }),
    on(TeamMemberApiActions.updateSuccess, (state, action): TeamMemberState => {
        const entities = state.entities.map(x => x.id === action.entity.id ? action.entity : x);
        return {
            ...state,
            isUpdating: false,
            error: null,
            entities
        };
    }),
    on(TeamMemberApiActions.updateFailure, (state, action): TeamMemberState => {
        return {
            ...state,
            isUpdating: false,
            error: action.error,
        };
    }),

    // Remove TeamMember
    on(TeamMemberUiActions.remove, (state, action): TeamMemberState => {
        return {
            ...state,
            isDeleting: true
        };
    }),
    on(TeamMemberApiActions.removeSuccess, (state, action): TeamMemberState => {
        const entities = state.entities.filter(x => x.id !== action.id);
        return {
            ...state,
            isDeleting: false,
            error: null,
            entities
        };
    }),
    on(TeamMemberApiActions.removeFailure, (state, action): TeamMemberState => {
        return {
            ...state,
            isDeleting: false,
            error: action.error,
        };
    }),
);

export function teamMembersReducer(state: TeamMemberState, action: Action): any {
    return _teamMembersReducer(state, action);
}
