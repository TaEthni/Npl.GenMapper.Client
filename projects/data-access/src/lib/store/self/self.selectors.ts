import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SelfState } from './self.state';


export const selfFeatureSelector = createFeatureSelector<SelfState>('self');

export const SelfSelectors = {
    getSelf: createSelector(
        selfFeatureSelector,
        state => state.self
    ),

    loaded: createSelector(
        selfFeatureSelector,
        state => state.loaded
    ),

    isLoading: createSelector(
        selfFeatureSelector,
        state => state.isLoading
    ),

    isUpdating: createSelector(
        selfFeatureSelector,
        state => state.isUpdating
    ),
};
