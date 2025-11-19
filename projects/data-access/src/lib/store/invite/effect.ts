import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { InviteService } from '../../services/invite.service';
import { InviteApiActions, InviteUiActions } from './actions';

@Injectable()
export class InviteEffects {
    public constructor(
        private inviteService: InviteService,
        private snackBar: MatSnackBar,
        private actions$: Actions,
        private store: Store<any>
    ) { }

    public loadTenantInvites$ = createEffect(() => this.actions$.pipe(
        ofType(InviteUiActions.loadTeamInvites),
        mergeMap((action) => {
            return this.inviteService.getTeamInvites(action.teamId).pipe(
                map(entities => InviteApiActions.loadTeamInvitesSuccess({ entities, teamId: action.teamId })),
                catchError(e => of(InviteApiActions.loadTeamInvitesFailure({ error: e.error })))
            );
        })
    ));

    public sendInvites$ = createEffect(() => this.actions$.pipe(
        ofType(InviteUiActions.sendInvites),
        mergeMap((action) => this.inviteService.sendInvites(action.dto)
            .pipe(
                map(response => {
                    if (response.sentInvites.length > 0) {
                        this.snackBar.open('Invite Sent', 'OK');
                    }

                    if (response.unsentInvites.length > 0) {
                        return InviteApiActions.sendInvitesPartialSuccess({
                            error: response.unsentReason,
                            sentInvites: response.sentInvites,
                            unsentInvites: response.unsentInvites
                        });
                    }

                    return InviteApiActions.sendInvitesSuccess({ entities: response.sentInvites });
                }),
                catchError(e => {
                    this.snackBar.open('Error sending invites', 'OK');
                    return of(InviteApiActions.sendInvitesFailure({ error: e.error }));
                })
            )
        )
    ));

    public cancelInvite$ = createEffect(() => this.actions$.pipe(
        ofType(InviteUiActions.cancelInvite),
        mergeMap((action) => this.inviteService.cancelInvite(action.id)
            .pipe(
                map(() => {
                    this.snackBar.open('Invite has been canceled', 'OK');
                    return InviteApiActions.cancelInviteSuccess({ inviteId: action.id });
                }),
                catchError(e => {
                    this.snackBar.open('Error canceling the invite', 'OK');
                    return of(InviteApiActions.cancelInviteFailure({ error: e.error }));
                })
            )
        )
    ));

    public resendInvite$ = createEffect(() => this.actions$.pipe(
        ofType(InviteUiActions.resendInvite),
        mergeMap((action) => this.inviteService.resendInvite(action.id)
            .pipe(
                map((response) => {
                    this.snackBar.open('Invite has been resent', 'OK');
                    return InviteApiActions.resendInviteSuccess({ invite: response });
                }),
                catchError(e => {
                    this.snackBar.open('Error re-sending the invite', 'OK');
                    return of(InviteApiActions.resendInviteFailure({ error: e.error }));
                })
            )
        )
    ));
}
