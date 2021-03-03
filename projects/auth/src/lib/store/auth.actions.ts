import { createAction, props } from '@ngrx/store';

import { AuthUser } from '../user';

export const initAuthorization = createAction(
    '[Auth] Init Authorization',
    props<{ authorized: boolean }>()
);

export const loadUserProfile = createAction(
    '[Auth] Load User Profile'
);

export const loadUserProfileSuccess = createAction(
    '[Auth] Load User Profile Success',
    props<{ user: AuthUser }>()
);

export const loadUserProfileFailure = createAction(
    '[Auth] Load User Profile Failure',
    props<{ error: string }>()
);

export const login = createAction('[Auth] login');
export const logout = createAction('[Auth] logout');

