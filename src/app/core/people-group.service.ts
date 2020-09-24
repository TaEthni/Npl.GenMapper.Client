import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '@core/entity.service';
import { EntityType } from '@models/entity.model';
import { Dictionary, groupBy } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

let peopleGroupsConfig: PeopleGroupConfig;

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

export const LOCALE_STORAGE_KEY = '_locale_pg-v2';

const OLD_KEYS = ['_locale_pg-v1'];
OLD_KEYS.forEach(KEY => localStorage.removeItem(KEY));

export const UnknownPeopleGroup = {
    NmDisp: 'Unknown',
    PEID: -2
} as PeopleGroupModelItem;

export const OtherPeopleGroup = {
    NmDisp: 'Other',
    PEID: -3
} as PeopleGroupModelItem;

@Injectable({
    providedIn: 'root'
})
export class PeopleGroupService {
    public isLoading = false;
    public config: PeopleGroupConfig;
    public countries: string[];
    public peopleGroups: PeopleGroupModelItem[];
    private _config = new BehaviorSubject<PeopleGroupConfig>(null);

    constructor(
        private http: HttpClient
    ) { }

    public getPeopleGroups(): Observable<PeopleGroupConfig> {
        if (!this._config.getValue() && !this.isLoading) {
            this.load().subscribe();
        }

        return this._config.asObservable().pipe(filter(d => !!d));
    }

    public getByPeid(peid: number): PeopleGroupModelItem {
        if (peid === UnknownPeopleGroup.PEID) { return UnknownPeopleGroup; }
        if (peid === OtherPeopleGroup.PEID) { return OtherPeopleGroup; }
        return this.config.features.find(f => f.PEID === peid);
    }

    public load(): Observable<PeopleGroupConfig> {
        if (peopleGroupsConfig) {
            return of(peopleGroupsConfig);
        }

        const localeData = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (localeData) {
            const features = JSON.parse(localeData);
            this.setConfig(features);
            return of(peopleGroupsConfig);
        }

        this.isLoading = true;

        return this.http.get<PeopleGroupResponse>(BaseUrl + EntityType.PeopleGroups).pipe(map(p => {
            const features = this.createData(p.data.features);
            this.setConfig(features);
            this.isLoading = false;
            localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(features));
            return this.config;
        }));
    }

    private createData(data: PeopleGroupModel[]): PeopleGroupModelItem[] {
        return data.map(d => {
            const { NmDisp, PEID, Ctry, GENC0 } = d.attributes;
            return {
                NmDisp, PEID, Ctry, GENC0,
            }
        });
    }

    private setConfig(features: PeopleGroupModelItem[]): void {
        const byCountry = groupBy(features, (d) => d.GENC0);
        this.config = peopleGroupsConfig = { features, byCountry };
        this._config.next(this.config);
    }
}
