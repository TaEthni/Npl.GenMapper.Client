import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureName, AuthState } from './auth.state';


export const getAuthFeatureState = createFeatureSelector<AuthState>(authFeatureName);

export const isAuthenticated = createSelector(
    getAuthFeatureState,
    (state: AuthState) => state.isAuthenticated
);

export const getUserProfile = createSelector(
    getAuthFeatureState,
    (state: AuthState) => state.user
);
