import { createReducer, on } from '@ngrx/store';

import { SelfAPIActions, SelfUIActions } from './self.actions';
import { initialSelfState, SelfState } from './self.state';

export const selfReducer = createReducer<SelfState>(
    initialSelfState,
    on(SelfUIActions.loadSelf, (state, action): SelfState => {
        return {
            ...state,
            isLoading: true,
            error: null
        };
    }),
    on(SelfAPIActions.loadSelfSuccess, (state, action): SelfState => {
        return {
            ...state,
            self: action.self,
            loaded: true,
            isLoading: false,
            error: null
        };
    }),
    on(SelfAPIActions.loadSelfFailure, (state, action): SelfState => {
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
    })
);
