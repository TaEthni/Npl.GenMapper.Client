import { createAction, props } from '@ngrx/store';

import { Member } from '../../models';

const loadSelf = createAction(
    '[Self UI] Load'
);


const loadSelfSuccess = createAction(
    '[Self API] Load Success',
    props<{ self: Member }>()
);
const loadSelfFailure = createAction(
    '[Self API] Load Failure',
    props<{ error: string }>()
);


export const SelfUIActions = {
    loadSelf
};

export const SelfAPIActions = {
    loadSelfSuccess,
    loadSelfFailure
};
