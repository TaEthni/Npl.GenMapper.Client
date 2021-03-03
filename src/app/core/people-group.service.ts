import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '@npl-core/entity.service';
import {
    EntityType,
    OtherPeopleGroup,
    PeopleGroupConfig,
    PeopleGroupModel,
    PeopleGroupModelItem,
    PeopleGroupResponseData,
    UnknownPeopleGroup,
} from '@npl-data-access';
import { groupBy } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export const LOCALE_STORAGE_KEY = '_locale_pg-v2';

let peopleGroupsConfig: PeopleGroupConfig;

const OLD_KEYS = ['_locale_pg-v1'];
OLD_KEYS.forEach(KEY => localStorage.removeItem(KEY));

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
        if (peid === UnknownPeopleGroup.peid) { return UnknownPeopleGroup; }
        if (peid === OtherPeopleGroup.peid) { return OtherPeopleGroup; }
        return this.config.features.find(f => f.peid === peid);
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

        return this.http.get<PeopleGroupResponseData>(BaseUrl + EntityType.PeopleGroups).pipe(map(data => {
            const features = this.createData(data.features);
            this.setConfig(features);
            this.isLoading = false;
            localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(features));
            return this.config;
        }));
    }

    private createData(data: PeopleGroupModel[]): PeopleGroupModelItem[] {
        return data.map(d => {
            const { nmDisp, peid, ctry, genC0 } = d.attributes;
            return {
                nmDisp, peid, ctry, genC0,
            };
        });
    }

    private setConfig(features: PeopleGroupModelItem[]): void {
        const byCountry = groupBy(features, (d) => d.genC0);
        this.config = peopleGroupsConfig = { features, byCountry };
        this._config.next(this.config);
    }
}
