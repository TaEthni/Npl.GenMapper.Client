import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { TeamsService } from '../../services/teams.service';
import { TeamApiActions, TeamUiActions } from './actions';
import { TeamSelectors } from './selectors';

@Injectable()
export class TeamEffects {
    public endpoint = 'teams';

    constructor(
        private actions$: Actions,
        private service: TeamsService,
        private store: Store<any>
    ) {
    }

    public loadUserTeams$ = createEffect(() => this.actions$.pipe(
        ofType(TeamUiActions.loadUserTeams),
        mergeMap(action => this.service.load().pipe(
            map(response => TeamApiActions.loadUserTeamsSuccess({ entities: response })),
            catchError(e => of(TeamApiActions.loadUserTeamsFailure({ error: e.error })))
        ))
    ));

    public lazyLoadUserTeams$ = createEffect(() => this.actions$.pipe(
        ofType(TeamUiActions.lazyLoadUserTeams),
        concatLatestFrom(() => this.store.select(TeamSelectors.getEntities)),
        map(([action, cached]) => {
            if (cached && cached.length) {
                return TeamApiActions.lazyLoadUserTeamsSuccess();
            }
            return TeamUiActions.loadUserTeams();
        })
    ));

    public create$ = createEffect(() => this.actions$.pipe(
        ofType(TeamUiActions.create),
        mergeMap(action => this.service.create(action.dto).pipe(
            map(response => TeamApiActions.createSuccess({ entity: response })),
            tap(() => {
                if (action.onComplete) { action.onComplete(); }
            }),
            catchError(e => of(TeamApiActions.createFailure({ error: e.error })))
        ))
    ));

    public update$ = createEffect(() => this.actions$.pipe(
        ofType(TeamUiActions.update),
        mergeMap(action => this.service.update(action.id, action.dto).pipe(
            map(response => TeamApiActions.updateSuccess({ entity: response })),
            tap(() => {
                if (action.onComplete) { action.onComplete(); }
            }),
            catchError(e => of(TeamApiActions.updateFailure({ error: e.error })))
        ))
    ));
}
