import { Dictionary } from 'lodash';


export interface PeopleGroupResponse {
    data: PeopleGroupResponseData;
}

export class PeopleGroupModelItem {
    NmDisp: string = null;
    PEID: number = null;
    Ctry: string = null;
    GENC0: string = null;
}

export class PeopleGroupModel {
    attributes: PeopleGroupModelItem;
}

export interface PeopleGroupResponseData {
    byPEID: Dictionary<PeopleGroupModelItem[]>;
    byCountry: Dictionary<PeopleGroupModelItem[]>;
    displayFieldName: string;
    features: PeopleGroupModel[];
    fieldAliases: Dictionary<string>;
    fields: { alias: string, name: string, type: string }[];
    data: PeopleGroupModelItem[];
}

export interface PeopleGroupConfig {
    features?: PeopleGroupModelItem[];
    byCountry?: Dictionary<PeopleGroupModelItem[]>;
}



export const UnknownPeopleGroup = {
    NmDisp: 'Unknown',
    PEID: -2
} as PeopleGroupModelItem;

export const OtherPeopleGroup = {
    NmDisp: 'Other',
    PEID: -3
} as PeopleGroupModelItem;
