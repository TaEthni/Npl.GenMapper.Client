import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects, authReducer, AuthState } from '@npl-auth';

import { SelfEffects, selfReducer, SelfState } from './self';

export interface AppState {
    auth: AuthState;
    self: SelfState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    self: selfReducer
};

export const appEffects = [
    AuthEffects,
    SelfEffects
];
