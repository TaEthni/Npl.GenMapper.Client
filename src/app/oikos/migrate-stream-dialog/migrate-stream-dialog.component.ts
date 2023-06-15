import { Component, Inject, OnInit } from '@angular/core';
import { OikosService } from '../oikos.service';
import { ActivityCreateDto, ActivityPoint, Team, TeamTemplate, Workspace } from '../oikos.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { filter, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Dictionary, sortBy } from 'lodash';
import { DocumentDto, NodeDto } from '@npl-data-access';
import { GMTemplate } from '@npl-template';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import uuid from 'uuid';

interface Config {
    document: DocumentDto;
    template: GMTemplate;
    nodes: NodeDto[];
}

@Component({
    selector: 'app-migrate-stream-dialog',
    templateUrl: './migrate-stream-dialog.component.html',
    styleUrls: ['./migrate-stream-dialog.component.scss'],
})
export class MigrateStreamDialogComponent extends Unsubscribable implements OnInit {
    public static configure(config: Config): MatDialogConfig {
        return {
            data: config,
        };
    }

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

    public constructor(
        @Inject(MAT_DIALOG_DATA) public config: Config,

        private oikos: OikosService
    ) {
        super();
        console.log(this);
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

// function createActivities(nodes: NodeDto[], teamId: string, templateId: string) {
//     const newIds: Dictionary<string> = {};
//     nodes.forEach((node) => (newIds[node.id] = uuid()));

//     nodes.forEach((node) => {
//         const activity: ActivityCreateDto = {
//             teamId,
//             templateId,
//             parentActivityId: newIds[node.parentId],
//             point: new ActivityPoint(),
//         };
//     });
// }
