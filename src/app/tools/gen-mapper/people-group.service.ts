import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Dictionary, groupBy } from 'lodash';

// tslint:disable-next-line:max-line-length
const URL = 'https://gis.imb.org/arcgis/rest/services/LIVE/PeopleGroupsOrg/MapServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&f=json';
let peopleGroupsConfig: PeopleGroupConfig;

export interface PeopleGroupModel {
    attributes: {
        NmDisp: string;
        PEID: number;
        Ctry: string;
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

@Injectable({
    providedIn: 'root'
})
export class PeopleGroupService {
    public config: PeopleGroupConfig;
    public countries: string[];
    public peopleGroups: PeopleGroupModel[];

    private _config = new BehaviorSubject<PeopleGroupConfig>(null);

    constructor(
        private http: HttpClient
    ) { }

    public getPeopleGroups(): Observable<PeopleGroupConfig> {
        return this._config.asObservable().pipe(filter(d => !!d));
    }

    public load(): Observable<PeopleGroupConfig> {
        if (peopleGroupsConfig) {
            return of(peopleGroupsConfig);
        }

        return this.http.get<PeopleGroupConfig>(URL).pipe(map(p => {
            this.config = peopleGroupsConfig = p;
            this.config.byCountry = groupBy(this.config.features, (d) => d.attributes.Ctry);
            this._config.next(this.config);
            return this.config;
        }));
    }
}
