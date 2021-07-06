import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TeamMemberState } from './state';

export const teamMemberFeatureSelector = createFeatureSelector<TeamMemberState>('teamMembers');

class Selectors {
    public getEntities = createSelector(
        teamMemberFeatureSelector,
        state => state.entities
    );

    public isLoading = createSelector(
        teamMemberFeatureSelector,
        state => state.isLoading
    );

    public isUpdating = createSelector(
        teamMemberFeatureSelector,
        state => state.isUpdating
    );
}

export const TeamMemberSelectors = new Selectors();
