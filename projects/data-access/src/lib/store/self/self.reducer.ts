import { Action, createReducer, on } from '@ngrx/store';

import { SelfAPIActions, SelfUIActions } from './self.actions';
import { initialSelfState, SelfState } from './self.state';

const _selfReducer = createReducer<SelfState>(
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
    }),

    // ==============
    // Accept Agreement
    on(SelfUIActions.acceptAgreement, (state, action): SelfState => {
        return {
            ...state,
            isUpdating: true,
            error: null
        };
    }),
    on(SelfAPIActions.acceptAgreementSuccess, (state, action): SelfState => {
        return {
            ...state,
            self: action.self,
            isUpdating: false,
            error: null
        };
    }),
    on(SelfAPIActions.acceptAgreementFailure, (state, action): SelfState => {
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
    })
);

export function selfReducer(state: SelfState, action: Action): any {
    return _selfReducer(state, action);
}
