import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { TeamMembersService } from '../../services/team-members.service';
import { TeamMemberApiActions, TeamMemberUiActions } from './actions';

@Injectable()
export class TeamMemberEffects {
    public endpoint = 'teamMembers';

    constructor(
        private actions$: Actions,
        private service: TeamMembersService,
        private snackBar: MatSnackBar
    ) {
    }

    public loadMembersForTeam$ = createEffect(() => this.actions$.pipe(
        ofType(TeamMemberUiActions.loadMembersForTeam),
        mergeMap(action => this.service.loadMembers(action.teamId).pipe(
            map(response => TeamMemberApiActions.loadMembersForTeamSuccess({ entities: response, teamId: action.teamId })),
            catchError(e => of(TeamMemberApiActions.loadMembersForTeamFailure({ error: e.error })))
        ))
    ));

    public update$ = createEffect(() => this.actions$.pipe(
        ofType(TeamMemberUiActions.update),
        mergeMap(action => this.service.update(action.teamId, action.id, action.dto).pipe(
            map(response => TeamMemberApiActions.updateSuccess({ entity: response })),
            tap(() => {
                if (action.onComplete) { action.onComplete(); }
            }),
            tap(() => {
                this.snackBar.open('Member updated successfully', 'OK', { duration: 3000 });
            }),
            catchError(e => of(TeamMemberApiActions.updateFailure({ error: e.error })))
        ))
    ));

    public remove$ = createEffect(() => this.actions$.pipe(
        ofType(TeamMemberUiActions.remove),
        mergeMap(action => this.service.remove(action.teamId, action.id).pipe(
            map(() => TeamMemberApiActions.removeSuccess({ id: action.id })),
            tap(() => {
                if (action.onComplete) { action.onComplete(); }
            }),
            tap(() => {
                this.snackBar.open('Member removed successfully', 'OK', { duration: 3000 });
            }),
            catchError(e => of(TeamMemberApiActions.removeFailure({ error: e.error })))
        ))
    ));
}
