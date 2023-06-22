import { Component, Inject, OnInit } from '@angular/core';
import { OikosService } from '../oikos.service';
import {
    ActivityCreateDto,
    ActivityPoint,
    ActivityPointSource,
    AnswerCreateDto,
    AnswerValue,
    Team,
    TeamTemplate,
    Workspace,
} from '../oikos.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { combineAll, filter, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Dictionary, sortBy } from 'lodash';
import { DocumentDto, NodeDto } from '@npl-data-access';
import { ControlType, GMTemplate } from '@npl-template';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import uuid from 'uuid';
import { GeocoderService } from '@npl-shared/geocoder.service';
import { Observable, combineLatest } from 'rxjs';
import { pipeline } from 'stream';

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

        private oikos: OikosService,
        private geocoder: GeocoderService
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

    public migrate(): void {
        this.createActivities(
            this.config.nodes,
            this.config.template,
            this.form.get('team')?.value,
            this.form.get('templateId')?.value
        );
    }

    private createActivities(nodes: NodeDto[], gmTemplate: GMTemplate, teamId: string, templateId: string) {
        const newIds: Dictionary<string> = {};
        const observers: Observable<ActivityPoint>[] = [];

        const activities: ActivityCreateDto[] = [];
        nodes.forEach((node) => (newIds[node.id] = uuid()));

        nodes.forEach((node) => {
            const activity: ActivityCreateDto = {
                id: newIds[node.id],
                externalId: node.id,
                externalParentId: node.parentId,
                teamId,
                templateId,
                parentActivityId: newIds[node.parentId],
                point: new ActivityPoint(),
                answers: [],
            };

            gmTemplate.fields
                .filter((x) => !!x.oikosQuestionId)
                .forEach((field) => {
                    const answer: AnswerCreateDto = {
                        questionId: field.oikosQuestionId,
                        questionGroupId: field.oikosQuestionGroupId,
                        questionSequence: 0,
                        questionGroupSequence: 0,
                        value: new AnswerValue(),
                        valueType: field.valueType,
                        controlType: field.type,
                    };

                    if (field.options) {
                        const fieldValue = node.attributes[field.id];
                        const optionValue = field.options.find((x) => x.value === fieldValue);
                        if (optionValue) {
                            answer.value['boolean'] = optionValue.oikosQuestionValue;
                        }
                    } else {
                        answer.value[field.valueType] = node.attributes[field.id];
                    }

                    activity.answers.push(answer);
                });

            gmTemplate.fields
                .filter((x) => x.oikosQuestionGroupId && !x.oikosQuestionId)
                .forEach((group) => {
                    group.fields
                        .filter((x) => !!x.oikosQuestionId)
                        .forEach((field) => {
                            const nodeAnswer = node.attributes[group.id];

                            nodeAnswer.forEach((value, index: number) => {
                                const answer: AnswerCreateDto = {
                                    questionId: field.oikosQuestionId,
                                    questionGroupId: field.oikosQuestionGroupId,
                                    questionSequence: 0,
                                    questionGroupSequence: index,
                                    value: new AnswerValue(),
                                    valueType: field.valueType,
                                    controlType: field.type,
                                };

                                answer.value[field.valueType] = value[field.id];

                                activity.answers.push(answer);
                            });
                        });
                });

            const point = new ActivityPoint();
            const countryField = gmTemplate.fields.find((x) => x.type == ControlType.countrySelector);
            const latitude = node.attributes.latitude;
            const longitude = node.attributes.longitude;
            const country = node.attributes[countryField.id];

            console.log({ latitude, longitude });
            if (node.attributes.location && latitude && longitude) {
                point.latitude = latitude;
                point.longitude = longitude;
                point.source = ActivityPointSource.Point;
                observers.push(
                    this.geocoder.locateWithLatLng({ latitude, longitude }).pipe(
                        map((response) => {
                            point.address = response.address;
                            point.countryCode = response.attributes.CountryCode;
                            point.isGeographic = response.location.spatialReference.isGeographic;
                            point.isWGS84 = response.location.spatialReference.isWGS84;
                            point.isWebMercator = response.location.spatialReference.isWebMercator;
                            point.wkid = response.location.spatialReference.wkid;
                            point.lastestWkid = response.location.spatialReference['latestWkid'];
                            point.wkt = response.location.spatialReference.wkt;
                            point.zoom = 16;
                            return point;
                        })
                    )
                );
            } else if (country) {
                point.source = ActivityPointSource.Point;
                observers.push(
                    this.geocoder.locateWithCountryCode(country).pipe(
                        map((results) => {
                            const response = results[0];
                            point.latitude = response.location.latitude;
                            point.longitude = response.location.longitude;
                            point.address = response.address;
                            point.countryCode = response.attributes.CountryCode || country;
                            point.isGeographic = response.location.spatialReference.isGeographic;
                            point.isWGS84 = response.location.spatialReference.isWGS84;
                            point.isWebMercator = response.location.spatialReference.isWebMercator;
                            point.wkid = response.location.spatialReference.wkid;
                            point.lastestWkid = response.location.spatialReference['latestWkid'];
                            point.wkt = response.location.spatialReference.wkt;
                            point.zoom = 1;
                            return point;
                        })
                    )
                );
            }

            activity.point = point;
            activities.push(activity);
        });

        combineLatest(observers).subscribe((result) => {
            console.log(activities);
        });
    }
}
