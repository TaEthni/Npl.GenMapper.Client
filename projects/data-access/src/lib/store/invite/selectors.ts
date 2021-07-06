import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InviteState } from './state';

export const inviteFeatureSelector = createFeatureSelector<InviteState>('invites');


class Selectors {
    public getEntities = createSelector(
        inviteFeatureSelector,
        (state) => state.entities
    );

    public isLoading = createSelector(
        inviteFeatureSelector,
        (state) => state.isLoading
    );

    public getInvitesSendingState = createSelector(
        inviteFeatureSelector,
        ({ isCreating, sentInvites, unsentInvites, error }) => ({ isCreating, sentInvites, unsentInvites, error })
    );

    public isDeleting = createSelector(
        inviteFeatureSelector,
        ({ isDeleting }) => isDeleting
    );

    public isUpdating = createSelector(
        inviteFeatureSelector,
        ({ isUpdating }) => isUpdating
    );
}

export const InviteSelectors = new Selectors();
