import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { SelfService } from '../../services/self.service';
import { SelfAPIActions, SelfUIActions } from './self.actions';

@Injectable({
    providedIn: 'root'
})
export class SelfEffects {
    constructor(
        private actions$: Actions,
        private selfService: SelfService
    ) { }

    public loadSelf$ = createEffect(() => this.actions$.pipe(
        ofType(SelfUIActions.loadSelf),
        mergeMap(() => this.selfService.get().pipe(
            map(self => SelfAPIActions.loadSelfSuccess({ self })),
            catchError(e => of(SelfAPIActions.loadSelfFailure({ error: e.error })))
        ))
    ));
}
