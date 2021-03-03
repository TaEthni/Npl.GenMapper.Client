import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    public constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    public login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(() => this.authService.login())
        ),
        { dispatch: false }
    );

    public logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => this.authService.logout())
        ),
        { dispatch: false }
    );

    public initAuthorization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.initAuthorization),
            filter(x => x.authorized),
            map(() => AuthActions.loadUserProfile())
        )
    );

    public navigateOnInitAuthorization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.initAuthorization),
            filter(x => x.authorized),
            map(() => this.authService.getPostAuthorizeUrl()),
            filter(x => !!x),
            tap((postAuthorizeUrl) => {
                this.router.navigateByUrl(postAuthorizeUrl);
                this.authService.clearPostAuthorizeUrl();
            })
        ),
        { dispatch: false }
    );


    public loadUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadUserProfile),
            switchMap(() => this.authService.loadUser()),
            map((user) => AuthActions.loadUserProfileSuccess({ user })),
            catchError(error => of(AuthActions.loadUserProfileFailure({ error })))
        )
    );
}
