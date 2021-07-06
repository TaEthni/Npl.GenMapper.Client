import { Action, createReducer, on } from '@ngrx/store';

import { TeamApiActions, TeamUiActions } from './actions';
import { initialTeamState, TeamState } from './state';

const _teamsReducer = createReducer<TeamState>(
    initialTeamState,
    on(TeamUiActions.select, (state, action): TeamState => {
        return {
            ...state,
            selectedId: action.id
        };
    }),

    // Load Teams
    on(TeamUiActions.loadUserTeams, (state, action): TeamState => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(TeamUiActions.lazyLoadUserTeams, (state, action): TeamState => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(TeamApiActions.lazyLoadUserTeamsSuccess, (state, action): TeamState => {
        return {
            ...state,
            isLoading: false,
            error: null,
        };
    }),
    on(TeamApiActions.loadUserTeamsSuccess, (state, action): TeamState => {
        return {
            ...state,
            isLoading: false,
            error: null,
            entities: action.entities
        };
    }),
    on(TeamApiActions.loadUserTeamsFailure, (state, action): TeamState => {
        return {
            ...state,
            isLoading: false,
            error: action.error,
        };
    }),


    // Create Team
    on(TeamUiActions.create, (state, action): TeamState => {
        return {
            ...state,
            isCreating: true
        };
    }),
    on(TeamApiActions.createSuccess, (state, action): TeamState => {
        return {
            ...state,
            isCreating: false,
            error: null,
            entities: [...state.entities, action.entity]
        };
    }),
    on(TeamApiActions.createFailure, (state, action): TeamState => {
        return {
            ...state,
            isCreating: false,
            error: action.error,
        };
    }),

    // Update Team
    on(TeamUiActions.update, (state, action): TeamState => {
        return {
            ...state,
            isUpdating: true
        };
    }),
    on(TeamApiActions.updateSuccess, (state, action): TeamState => {
        const entities = state.entities.map(x => x.id === action.entity.id ? action.entity : x);
        return {
            ...state,
            isUpdating: false,
            error: null,
            entities
        };
    }),
    on(TeamApiActions.updateFailure, (state, action): TeamState => {
        return {
            ...state,
            isUpdating: false,
            error: action.error,
        };
    }),
);

export function teamsReducer(state: TeamState, action: Action): any {
    return _teamsReducer(state, action);
}
