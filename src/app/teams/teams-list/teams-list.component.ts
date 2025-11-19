import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, Team, TeamSelectors, TeamUiActions } from '@npl-data-access';
import { takeUntil } from 'rxjs/operators';

import { TeamCreateDialogComponent } from '../team-create-dialog/team-create-dialog.component';
import { TeamDetailDialogComponent } from '../team-detail-dialog/team-detail-dialog.component';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent extends Unsubscribable implements OnInit {
    @ViewChild(MatPaginator)
    public set paginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
    }

    public readonly search = new UntypedFormControl();
    public readonly displayedColumns = ['name', 'role', 'created', 'action'];
    public readonly dataSource = new MatTableDataSource<Team>();

    public data: Team[];

    constructor(
        private store: Store<AppState>,
        private dialog: MatDialog
    ) { super(); }

    public ngOnInit(): void {
        this.store.dispatch(TeamUiActions.loadUserTeams());
        this.store.select(TeamSelectors.getEntities).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.data = result;
            this.dataSource.data = this.data;
        });

        this.search.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.dataSource.filter = (result || '').toLowerCase();
        });
    }

    public create(): void {
        this.dialog.open(TeamCreateDialogComponent);
    }

    public edit(team: Team): void {
        this.dialog.open(TeamDetailDialogComponent, {
            data: { team }
        });
    }
}
