import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects, authReducer, AuthState } from '@npl-auth';

export interface AppState {
    auth: AuthState,
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducer
};

export const appEffects = [
    AuthEffects
];
