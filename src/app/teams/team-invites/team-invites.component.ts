import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { ActivatedRoute } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, Invite, InviteSelectors, InviteUiActions, TeamSelectors, TeamUiActions } from '@npl-data-access';
import { debounceTime, take, takeUntil } from 'rxjs/operators';

import { TeamInvitesCreateDialogComponent } from '../team-invites-create-dialog/team-invites-create-dialog.component';

export const CurrentTeamInvites = createSelector(
    TeamSelectors.getSelectedId,
    InviteSelectors.getEntities,
    (teamId, invites) => invites.filter(x => x.teamId === teamId)
);

@Component({
    selector: 'app-team-invites',
    templateUrl: './team-invites.component.html',
    styleUrls: ['./team-invites.component.scss']
})
export class TeamInvitesComponent extends Unsubscribable implements OnInit {
    @ViewChild(MatPaginator)
    public set paginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
    }

    public readonly searchControl = new UntypedFormControl();
    public readonly acceptedControl = new UntypedFormControl();
    public readonly acceptedColumns = ['email', 'acceptedEmail', 'acceptedUserName', 'senderName', 'acceptedDate', 'expiryDate', 'createdDate', 'action'];
    public readonly defaultColumns = ['email', 'senderName', 'expiryDate', 'createdDate', 'action'];
    public readonly dataSource = new MatTableDataSource<Invite>();
    public readonly team$ = this.store.select(TeamSelectors.getSelected);
    public readonly isLoading$ = this.store.select(InviteSelectors.isLoading);

    public data: Invite[];
    private teamId: string;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) { super(); }

    public ngOnInit(): void {
        this.teamId = this.route.snapshot.params.teamId;
        this.store.dispatch(TeamUiActions.lazyLoadUserTeams());
        this.store.dispatch(TeamUiActions.select({ id: this.teamId }));
        this.store.dispatch(InviteUiActions.loadTeamInvites({ teamId: this.teamId }));

        this.store.select(CurrentTeamInvites).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.data = result;
            this.filterAcceptedInvites();
        });

        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                takeUntil(this.unsubscribe)
            )
            .subscribe(value => this.dataSource.filter = (value || '').toLowerCase());

        this.acceptedControl.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this.filterAcceptedInvites());
    }

    public invite(): void {
        this.team$.pipe(take(1)).subscribe(team => {
            this.dialog.open(TeamInvitesCreateDialogComponent, { data: { team } });
        });
    }

    public cancelInvite(invite: Invite): void {
        this.store.dispatch(InviteUiActions.cancelInvite({ id: invite.id }));
    }

    public resendInvite(invite: Invite): void {
        this.store.dispatch(InviteUiActions.resendInvite({ id: invite.id }));
    }

    private filterAcceptedInvites(): void {
        const showAccepted = this.acceptedControl.value;
        this.dataSource.data = showAccepted ? this.data : this.data.filter(x => !x.acceptedDate);
    }
}
