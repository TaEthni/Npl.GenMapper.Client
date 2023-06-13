import { Component, OnInit } from '@angular/core';
import { OikosService } from '../oikos.service';
import { Team, TeamTemplate, Workspace } from '../oikos.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { filter, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { sortBy } from 'lodash';

@Component({
    selector: 'app-migrate-stream-dialog',
    templateUrl: './migrate-stream-dialog.component.html',
    styleUrls: ['./migrate-stream-dialog.component.scss'],
})
export class MigrateStreamDialogComponent extends Unsubscribable implements OnInit {
    public form = new FormGroup({
        workspace: new FormControl(),
        team: new FormControl(),
        template: new FormControl(),
    });

    public workspaces: Workspace[];
    public teams: Team[];
    public templates: TeamTemplate[];

    public isLoadingWorkspaces: boolean;
    public isLoadingWorkspacesComplete: boolean;
    public isLoadingTeams: boolean;
    public isLoadingTeamsComplete: boolean;

    public constructor(private oikos: OikosService) {
        super();
    }

    public ngOnInit(): void {
        this.isLoadingWorkspaces = true;
        this.oikos
            .getWorkspaces()
            .pipe(
                finalize(() => {
                    this.isLoadingWorkspaces = false;
                    this.isLoadingWorkspacesComplete = true;
                })
            )
            .subscribe((workspaces) => {
                this.workspaces = sortBy(workspaces, (x) => x.name);
            });

        this.form
            .get('workspace')
            ?.valueChanges.pipe(
                tap((x) => {
                    if (x) {
                        this.form.patchValue({ team: null, template: null });
                    }
                }),
                filter((x) => !!x),
                tap(() => {
                    this.isLoadingTeams = true;
                    this.isLoadingTeamsComplete = false;
                }),
                switchMap((workspaceId) =>
                    this.oikos.getTeamsByWorkspaceId(workspaceId).pipe(
                        finalize(() => {
                            this.isLoadingTeams = false;
                            this.isLoadingTeamsComplete = true;
                        })
                    )
                ),
                takeUntil(this.unsubscribe)
            )
            .subscribe((teams) => {
                this.teams = sortBy(teams, (x) => x.name);
            });

        this.form
            .get('team')
            ?.valueChanges.pipe(
                filter((x) => !!x),
                takeUntil(this.unsubscribe)
            )
            .subscribe((teamId) => {
                this.form.patchValue({ template: null });
                this.templates = [];

                const team = this.teams.find((x) => x.id == teamId);
                const templates = team.templates;

                if (templates.length == 1) {
                    this.form.patchValue({ template: templates[0].templateId });
                } else {
                    this.templates = templates;
                }

                console.log(this.templates);
            });
    }
}
