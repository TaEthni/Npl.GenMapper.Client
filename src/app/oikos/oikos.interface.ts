export interface Workspace {
    name: string;
    id: string;
}

export interface Team {
    name: string;
    id: string;
    templates: TeamTemplate[];
}

export interface TeamTemplate {
    name: string;
    templateId: string;
    tags: string[];
}

export interface ActivityCreateDto {
    teamId: string;
    templateId: string;
    parentActivityId?: string | null;
    point: ActivityPoint;
    answers: AnswerCreateDto[];
}

export interface AnswerCreateDto {
    questionId: string;
    questionGroupId: string;
    questionSequence: string;
    questionGroupSequence: string;
    value: AnswerValue;
    valueType: string;
    controlType: string;
    isOther: boolean;
    otherValue: string;
}

export enum ActivityPointSource {
    Geolocation = 'Geolocation',
    Point = 'Point',
    Place = 'Place',
}

export class ActivityPoint {
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public intent: string;
    public source: ActivityPointSource | undefined;
    public countryCode: string;
    public address: string;
    public xmax: number;
    public xmin: number;
    public ymax: number;
    public ymin: number;
    public isWGS84?: boolean;
    public isGeographic?: boolean;
    public isWebMercator?: boolean;
    public lastestWkid?: number;
    public wkid?: number;
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
