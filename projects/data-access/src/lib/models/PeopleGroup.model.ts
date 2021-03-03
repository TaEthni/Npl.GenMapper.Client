import { Dictionary } from 'lodash';


export interface PeopleGroupResponse {
    data: PeopleGroupResponseData;
}

export interface PeopleGroupModelItem {
    nmDisp: string;
    peid: number;
    ctry: string;
    genC0: string;
}

export interface PeopleGroupModel {
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
    nmDisp: 'Unknown',
    peid: -2
} as PeopleGroupModelItem;

export const OtherPeopleGroup = {
    nmDisp: 'Other',
    peid: -3
} as PeopleGroupModelItem;
