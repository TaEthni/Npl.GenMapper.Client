import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import {
    AppState,
    Member,
    SelfSelectors,
    TeamMember,
    TeamMemberSelectors,
    TeamMemberUiActions,
    TeamMemberUpdateDto,
    TeamSelectors,
    TeamUiActions,
} from '@npl-data-access';
import { take, takeUntil } from 'rxjs/operators';

import { TeamInvitesCreateDialogComponent } from '../team-invites-create-dialog/team-invites-create-dialog.component';
import { TeamMemberRemoveDialogComponent } from '../team-member-remove-dialog/team-member-remove-dialog.component';

export const CurrentTeamMembers = createSelector(
    TeamSelectors.getSelectedId,
    TeamMemberSelectors.getEntities,
    (teamId, members) => members.filter(x => x.teamId === teamId)
);

@Component({
    selector: 'app-team-members',
    templateUrl: './team-members.component.html',
    styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent extends Unsubscribable implements OnInit {
    @ViewChild(MatPaginator)
    public set paginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
    }

    public readonly search = new FormControl();
    public readonly displayedColumns = ['name', 'email', 'role', 'created', 'action'];
    public readonly dataSource = new MatTableDataSource<TeamMember>();
    public readonly team$ = this.store.select(TeamSelectors.getSelected);
    public readonly isLoading$ = this.store.select(TeamMemberSelectors.isLoading);

    public self: Member;
    public data: TeamMember[];
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
        this.store.dispatch(TeamMemberUiActions.loadMembersForTeam({ teamId: this.teamId }));

        this.store.select(SelfSelectors.getSelf).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.self = result;
        });

        this.store.select(CurrentTeamMembers).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.data = result;
            this.dataSource.data = this.data;
        });
    }

    public invite(): void {
        this.team$.pipe(take(1)).subscribe(team => {
            this.dialog.open(TeamInvitesCreateDialogComponent, { data: { team } });
        });
    }

    public setRole(teamMember: TeamMember, role: string): void {
        if (teamMember.role === role) { return; }
        const dto: TeamMemberUpdateDto = {
            role
        };

        this.store.dispatch(TeamMemberUiActions.update({ teamId: teamMember.teamId, id: teamMember.id, dto }));
    }

    public delete(member: TeamMember): void {
        this.dialog.open(TeamMemberRemoveDialogComponent, { data: { member } });
    }
}
