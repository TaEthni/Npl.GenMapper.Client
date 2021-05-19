import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TeamState } from './state';

export const teamFeatureSelector = createFeatureSelector<TeamState>('teams');

class Selectors {
    public getEntities = createSelector(
        teamFeatureSelector,
        state => state.entities
    );

    public getSelectedId = createSelector(
        teamFeatureSelector,
        state => state.selectedId
    );

    public getSelected = createSelector(
        this.getEntities,
        this.getSelectedId,
        (entities, selectedId) => entities.find(x => x.id === selectedId)
    );

    public isLoading = createSelector(
        teamFeatureSelector,
        state => state.isLoading
    );

    public isCreating = createSelector(
        teamFeatureSelector,
        state => state.isCreating
    );

    public isUpdating = createSelector(
        teamFeatureSelector,
        state => state.isUpdating
    );
};


export const TeamSelectors = new Selectors();
