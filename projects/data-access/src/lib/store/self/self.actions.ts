import { createAction, props } from '@ngrx/store';

import { Member } from '../../models';

const loadSelf = createAction(
    '[Self UI] Load'
);

const acceptAgreement = createAction(
    '[Self UI] Accept Agreement'
);


const loadSelfSuccess = createAction(
    '[Self API] Load Success',
    props<{ self: Member }>()
);
const loadSelfFailure = createAction(
    '[Self API] Load Failure',
    props<{ error: string }>()
);


const acceptAgreementSuccess = createAction(
    '[Self API] Accept Agreement Success',
    props<{ self: Member }>()
);
const acceptAgreementFailure = createAction(
    '[Self API] Accept Agreement Failure',
    props<{ error: string }>()
);


export const SelfUIActions = {
    loadSelf,
    acceptAgreement
};

export const SelfAPIActions = {
    loadSelfSuccess,
    loadSelfFailure,
    acceptAgreementSuccess,
    acceptAgreementFailure
};
