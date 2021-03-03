import { Action, createReducer, on } from '@ngrx/store';

import * as authActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';


const authReducerInternal = createReducer(
    initialAuthState,
    on(authActions.initAuthorization, (state, action): AuthState => {
        return {
            ...state,
            isAuthenticated: action.authorized
        };
    }),
    on(authActions.logout, (state, action) => {
        return {
            ...state,
            user: null,
            isLoggedIn: false,
        };
    }),
    on(authActions.loadUserProfileSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        };
    }),
    on(authActions.loadUserProfileFailure, (state, action) => {
        return {
            ...state,
            user: null,
            isAuthenticated: false
        };
    })
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return authReducerInternal(state, action);
}
