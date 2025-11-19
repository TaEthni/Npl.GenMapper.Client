import { Component, Inject, OnInit } from '@angular/core';
import { OikosService } from '../oikos.service';
import {
    ActivityCreateDto,
    ActivityPoint,
    ActivityPointSource,
    AnswerCreateDto,
    AnswerValue,
    ETHNE_QUESION_ID,
    GL_PG_SOURCE_ID_QUESTION_ID,
    GL_PG_SOURCE_QUESTION_ID,
    LANGUAGE_QUESION_ID,
    ProgressDto,
    RELIGION_QUESION_ID,
    Team,
    TeamTemplate,
    Workspace,
} from '../oikos.interface';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import {
    catchError,
    combineAll,
    debounceTime,
    filter,
    finalize,
    map,
    switchMap,
    take,
    takeUntil,
    tap,
} from 'rxjs/operators';
import { Dictionary, sortBy } from 'lodash';
import { DocumentDto, NodeDto } from '@npl-data-access';
import { ControlType, GMTemplate, ValueType } from '@npl-template';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import uuid from 'uuid';
import { GeocoderService } from '@npl-shared/geocoder.service';
import { Observable, combineLatest, of, throwError } from 'rxjs';
import { PeopleGroupService } from '../people-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

interface Config {
    document: DocumentDto;
    template: GMTemplate;
    rootNodeId: string;
    loadNodes: () => Observable<NodeDto[]>;
}

enum ChipType {
    Team = 'Team',
    Church = 'Church',
}

@Component({
    selector: 'app-migrate-stream-dialog',
    templateUrl: './migrate-stream-dialog.component.html',
    styleUrls: ['./migrate-stream-dialog.component.scss'],
})
export class MigrateStreamDialogComponent extends Unsubscribable {
    public static configure(config: Config): MatDialogConfig {
        return {
            data: config,
        };
    }

    public maintenance: boolean = false;

    public autoCompleteControl = new UntypedFormControl();
    public chipControl = new UntypedFormControl(ChipType.Team);
    public form = new UntypedFormGroup({
        workspace: new UntypedFormControl(),
        team: new UntypedFormControl(),
        template: new UntypedFormControl(),
    });

    public workspaces: Workspace[];
    public teams: Team[];
    public templates: TeamTemplate[];
    public chipType = ChipType;
    public isReloadingProgress: boolean;
    public isLoadingProgress: boolean;
    public isLoadingWorkspaces: boolean;
    public isLoadingWorkspacesComplete: boolean;
    public isLoadingTeams: boolean;
    public isLoadingTeamsComplete: boolean;
    public isMigrating: boolean;
    public migrationSent: boolean;
    public progress: ProgressDto;
    public isInitialized: boolean;
    public initialTeams: Team[];
    public initialChurches: Team[];
    public isQueryingTeams: boolean;
    public isLoadingTemplates: boolean;

    public constructor(
        @Inject(MAT_DIALOG_DATA) public config: Config,

        private dialogRef: MatDialogRef<MigrateStreamDialogComponent>,

        private oikos: OikosService,
        private geocoder: GeocoderService,
        private peopleGroups: PeopleGroupService,
        private snackBack: MatSnackBar
    ) {
        super();

        if (!this.maintenance) {
            this.isLoadingProgress = true;
            this.loadProgress().subscribe((progress) => {
                this.isLoadingProgress = false;
                if (!progress || (!progress.isComplete && !progress.inProgress)) {
                    this.initialize();
                }
            });
        }
    }

    public initialize(): void {
        if (this.isInitialized) return;
        this.isInitialized = true;

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
                    this.initialTeams = null;
                    this.initialChurches = null;
                    this.teams = [];

                    this.queryTeams();
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();

        this.form
            .get('team')
            ?.valueChanges.pipe(
                filter((x) => !!x),
                tap(() => {
                    this.isLoadingTemplates = true;
                }),
                switchMap((teamId) => this.oikos.getTeamTemplates(teamId)),
                takeUntil(this.unsubscribe)
            )
            .subscribe((templates) => {
                this.form.patchValue({ template: null });
                this.templates = templates;

                if (templates.length === 1) {
                    this.form.patchValue({ template: templates[0].templateId });
                }

                this.isLoadingTemplates = false;
            });

        this.autoCompleteControl.valueChanges
            .pipe(
                debounceTime(300),
                filter((x) => typeof x === 'string'),
                takeUntil(this.unsubscribe)
            )
            .subscribe((search) => {
                this.queryTeams();
            });

        this.chipControl.valueChanges.pipe(debounceTime(300), takeUntil(this.unsubscribe)).subscribe((search) => {
            this.form.patchValue({ team: null, template: null });
            this.queryTeams();
        });
    }

    public reloadProgress() {
        this.isReloadingProgress = true;
        this.loadProgress().subscribe(() => {
            this.isReloadingProgress = false;
        });
    }

    public loadProgress(): Observable<ProgressDto> {
        return this.oikos.getProgress(this.config.rootNodeId).pipe(
            tap((result) => {
                this.progress = result;
            }),
            catchError((e) => {
                this.progress = null;
                this.isLoadingProgress = false;
                this.isReloadingProgress = false;
                return of(e);
            })
        );
    }

    public teamSelected(event: MatAutocompleteSelectedEvent) {
        const value = event.option.value as Team;
        this.form.patchValue({ team: value.id });
    }

    public displayWith = (team?: Team) => {
        return team?.name;
    };

    public migrate(): void {
        const value = this.form.value;
        this.isMigrating = true;

        this.config
            .loadNodes()
            .pipe(switchMap((nodes) => this.createActivities(nodes, this.config.template, value.team, value.template)))
            .pipe(
                take(1),
                switchMap((activities) =>
                    this.oikos.migrate({
                        workspaceId: value.workspace,
                        teamId: value.team,
                        templateId: value.template,
                        importName: this.config.document.title,
                        importId: this.config.rootNodeId,
                        source: 'npl-genmapper',
                        activities,
                    })
                ),
                tap(() => {
                    this.isMigrating = false;
                }),
                switchMap(() => this.loadProgress()),
                catchError((error) => {
                    if (error.error && error.error.detail === 'MigrationComplete') {
                        this.snackBack.open('Data has already been migrated', 'Ok');
                    } else if (error.error && error.error.detail === 'MigrationInProgress') {
                        this.snackBack.open('Data migration already in progress', 'Ok');
                    } else {
                        this.snackBack.open('Error Migrating', 'Ok');
                    }
                    return throwError(error);
                })
            )
            .subscribe((result) => {
                this.migrationSent = true;
                this.snackBack.open('Migration Received', 'Ok', { duration: 5000 });
            });
    }

    private createActivities(nodes: NodeDto[], gmTemplate: GMTemplate, teamId: string, templateId: string) {
        const observers: Observable<any>[] = [];

        const activities: ActivityCreateDto[] = [];

        nodes.forEach((node) => {
            const activity: ActivityCreateDto = {
                externalId: node.id,
                externalParentId: node.parentId,
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
                    const nodeAnswer = node.attributes[group.id];
                    if (group.id === 'peoples') {
                        nodeAnswer.forEach((value, index: number) => {
                            this.populatePeoples(
                                activity,
                                value.identifier,
                                group.oikosQuestionGroupId,
                                index,
                                observers
                            );
                        });
                    }

                    group.fields
                        .filter((x) => !!x.oikosQuestionId)
                        .forEach((field) => {
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

        if (observers.length > 0) {
            return combineLatest(observers).pipe(
                take(1),
                map(() => activities)
            );
        }

        return of(activities);
    }

    private populatePeoples(
        activity: ActivityCreateDto,
        identifier: number,
        questionGroupId: string,
        sequence: number,
        observers: Observable<any>[]
    ) {
        if (identifier && identifier > 0) {
            const source: AnswerCreateDto = {
                questionId: GL_PG_SOURCE_QUESTION_ID,
                questionGroupId: questionGroupId,
                questionSequence: 0,
                questionGroupSequence: sequence,
                value: new AnswerValue({ string: 'peid' }),
                valueType: ValueType.string,
                controlType: 'textInput' as ControlType,
            };

            const id: AnswerCreateDto = {
                questionId: GL_PG_SOURCE_ID_QUESTION_ID,
                questionGroupId: questionGroupId,
                questionSequence: 0,
                questionGroupSequence: sequence,
                value: new AnswerValue({ string: identifier.toString() }),
                valueType: ValueType.string,
                controlType: 'textInput' as ControlType,
            };

            activity.answers.push(source, id);
        } else {
            const ethne: AnswerCreateDto = {
                questionId: ETHNE_QUESION_ID,
                questionGroupId: questionGroupId,
                questionSequence: 0,
                questionGroupSequence: sequence,
                value: new AnswerValue({ number: -1 }),
                valueType: ValueType.number,
                controlType: 'ethneSelect' as ControlType,
            };

            const language: AnswerCreateDto = {
                questionId: LANGUAGE_QUESION_ID,
                questionGroupId: questionGroupId,
                questionSequence: 0,
                questionGroupSequence: sequence,
                value: new AnswerValue({ string: 'unknown' }),
                valueType: ValueType.string,
                controlType: 'languageSelect' as ControlType,
            };

            const religion: AnswerCreateDto = {
                questionId: RELIGION_QUESION_ID,
                questionGroupId: questionGroupId,
                questionSequence: 0,
                questionGroupSequence: sequence,
                value: new AnswerValue({ string: 'unknown' }),
                valueType: ValueType.string,
                controlType: 'religionSelect' as ControlType,
            };

            activity.answers.push(ethne, language, religion);
        }

        // if (identifier && identifier > 0) {
        //     observers.push(
        //         this.peopleGroups.query(identifier).pipe(
        //             map((result) => {
        //                 language.value.string = result.languageCode || language.value.string;
        //                 ethne.value.number = result.ethneId || ethne.value.number;
        //                 return result;
        //             })
        //         )
        //     );
        // }
    }

    private queryTeams(): void {
        let search = this.autoCompleteControl.value;
        let isSearchString = typeof search === 'string';

        if (search === '' || !isSearchString) {
            if (this.chipControl.value === ChipType.Church && this.initialChurches) {
                this.teams = this.initialChurches;
            }
            if (this.chipControl.value === ChipType.Team && this.initialTeams) {
                this.teams = this.initialTeams;
            }
        }

        this.isLoadingTeams = true;
        this.isLoadingTeamsComplete = false;
        this.oikos
            .queryTeams({
                workspaceId: this.form.get('workspace')?.value,
                search: isSearchString ? search : search && search.name ? search.name : '',
                pageNumber: 0,
                pageSize: 50,
                isChurchTeam: this.chipControl.value === ChipType.Church,
                withPermission: 'TeamTeams_Create',
            })
            .subscribe((teams) => {
                if (this.chipControl.value === ChipType.Church && !this.initialChurches) {
                    this.initialChurches = teams;
                }
                if (this.chipControl.value === ChipType.Team && !this.initialTeams) {
                    this.initialTeams = teams;
                }

                this.teams = teams;
                this.isLoadingTeams = false;
                this.isLoadingTeamsComplete = true;
            });
    }
}
