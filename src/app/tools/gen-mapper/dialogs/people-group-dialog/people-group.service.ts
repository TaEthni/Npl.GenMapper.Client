import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '@npl-core/entity.service';
import { EntityType } from '@npl-data-access';
import { Dictionary, groupBy } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

let peopleGroupsConfig: PeopleGroupConfig;

export interface PeopleGroupResponse {
    data: PeopleGroupConfig;
}

export interface PeopleGroupModel {
    attributes: {
        nmDisp: string;
        peid: number;
        ctry: string;
    };
}

export interface PeopleGroupConfig {
    byPEID: Dictionary<PeopleGroupModel[]>;
    byCountry: Dictionary<PeopleGroupModel[]>;
    displayFieldName: string;
    features: PeopleGroupModel[];
    fieldAliases: Dictionary<string>;
    fields: { alias: string, name: string, type: string }[];
}

@Injectable()
export class PeopleGroupService {
    public isLoading = false;
    public config: PeopleGroupConfig;
    public countries: string[];
    public peopleGroups: PeopleGroupModel[];

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

    public getByPeid(peid: number): PeopleGroupModel {
        return this.config.features.find(f => f.attributes.peid === peid);
    }

    public load(): Observable<PeopleGroupConfig> {
        if (peopleGroupsConfig) {
            return of(peopleGroupsConfig);
        }

        this.isLoading = true;

        return this.http.get<PeopleGroupConfig>(BaseUrl + EntityType.PeopleGroups).pipe(map(data => {
            this.config = peopleGroupsConfig = data;
            this.config.byCountry = groupBy(this.config.features, (d) => d.attributes.ctry);
            this.isLoading = false;
            this._config.next(this.config);
            return this.config;
        }));
    }
}
