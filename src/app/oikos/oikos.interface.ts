import { ControlType, ValueType } from '@npl-template';
import { Dictionary } from 'lodash';

export interface ProgressDto {
    inProgress: boolean;
    isError: boolean;
    isComplete: boolean;
    inProgressDate: Date | null;
    isErrorDate: Date | null;
    isCompleteDate: Date | null;
}

export interface Workspace {
    name: string;
    id: string;
}

export interface Team {
    name: string;
    id: string;
}

export interface TeamTemplate {
    name: string;
    templateId: string;
    tags: string[];
}

export interface MigrateDto {
    workspaceId: string;
    templateId: string;
    teamId: string;
    importName: string;
    importId: string;
    source: string;
    activities: ActivityCreateDto[];
}

export interface ActivityCreateDto {
    externalId: string;
    externalParentId: string;
    point: ActivityPoint;
    answers: AnswerCreateDto[];
}

export interface AnswerCreateDto {
    questionId: string;
    questionGroupId: string;
    questionSequence: number;
    questionGroupSequence: number;
    value: AnswerValue;
    valueType: ValueType;
    controlType: ControlType;
    isOther?: boolean;
    otherValue?: string;
}

export enum ActivityPointSource {
    Geolocation = 'Geolocation',
    Point = 'Point',
    Place = 'Place',
}

export class ActivityPoint {
    public latitude: number = 0;
    public longitude: number = 0;
    public zoom: number = 16;
    public intent: string;
    public source: ActivityPointSource | undefined;
    public countryCode: string;
    public address: string;
    public xmax: number = 0;
    public xmin: number = 0;
    public ymax: number = 0;
    public ymin: number = 0;
    public isWGS84?: boolean = true;
    public isGeographic?: boolean = true;
    public isWebMercator?: boolean = false;
    public lastestWkid?: number = 4326;
    public wkid?: number = 4326;
    public wkt?: string;
}

export class AnswerValue {
    public string: string | null = null;
    public date: Date | null = null;
    public boolean: boolean | null = null;
    public number: number | null = null;
    public uuid: string | null = null;
    public uuidList: string[] | null = null;
    public dateRange: null;

    public constructor(value?: any | null | undefined) {
        if (value) {
            Object.assign(this, value);
        }
    }
}

export const LANGUAGE_QUESION_ID = 'bc400786-25ca-431d-fcfb-08d9488a716b';
export const ETHNE_QUESION_ID = 'e191e5c5-1cdd-4663-fcfe-08d9488a716b';
export const RELIGION_QUESION_ID = '58d776d5-dd75-4028-7bd4-08d94ab5eec8';
export const GL_PG_SOURCE_ID_QUESTION_ID = '3a408cd7-8119-4cb2-b632-e1b820057cc0';
export const GL_PG_SOURCE_QUESTION_ID = 'a055d988-b2b7-4b90-8f87-e507696d7dd0';

export interface QueryBase extends Dictionary<any> {
    search?: string;
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
}

export interface TeamQuery extends QueryBase {
    workspaceId: string;
    teamId?: string;
    churchesOnly?: boolean;
    teamsOnly?: boolean;
    searchAdvanced?: boolean;
    withPermission?: string;
}
