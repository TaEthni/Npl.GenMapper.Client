import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity, EntityType, IEntity } from '@models/entity.model';
import { omit } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const devUrl = 'https://dev-api.noplaceleft.tools/api/';
const prodUrl = 'https://api.noplaceleft.tools/api/';
const localUrl = 'http://localhost:9000/api/';
// const localUrl = devUrl;

let _BaseUrl: string = localUrl;

if (window.location.host === 'dev.noplaceleft.tools') {
    _BaseUrl = devUrl;
}

if (window.location.host === 'https://taethni.github.io') {
    _BaseUrl = prodUrl;
}

if (window.location.host === 'noplaceleft.tools') {
    _BaseUrl = prodUrl;
}

export const BaseUrl = _BaseUrl;

interface ResponseData {
    data: any;
    status: string;
}

@Injectable()
export class EntityService {
    constructor(
        private http: HttpClient
    ) { }

    public customPost<T>(endpoint: string, data: any) {
        const url = BaseUrl + endpoint;
        return this.http.post<T>(url, data);
    }

    public customGet(endpoint: String) {
        const url = BaseUrl + endpoint;
        return this.http.get(url);
    }

    public getAll<T>(entityType: EntityType): Observable<T[]> {
        const url = BaseUrl + entityType;
        return this.http.get<ResponseData>(url).pipe(map((a => {
            a.data.forEach((node: Entity) => {
                node['entityType'] = entityType;

                if (entityType === EntityType.Documents) {
                    if (node['type'] === 'churchCirclesOkc') {
                        node['type'] = 'churchCircles12';
                    }
                }
            });
            return a.data;
        })));
    }

    public get<T>(entityType: EntityType, guid: string): Observable<T> {
        const url = BaseUrl + entityType + '/' + guid;
        return this.http.get<ResponseData>(url).pipe(map((a => {
            a.data['entityType'] = entityType;
            return a.data;
        })));
    }

    public create<T extends Entity>(entity: T | IEntity, allowId: boolean = false): Observable<T> {
        const url = BaseUrl + entity.entityType;
        let body = null;
        if (allowId) {
            body = omit(entity, ['entityType']);
        } else {
            body = omit(entity, ['id', 'entityType']);
        }

        return this.http.post<ResponseData>(url, body).pipe(map(d => {
            d.data['entityType'] = entity.entityType;
            return d.data;
        }));
    }

    public update<T extends Entity>(entity: T): Observable<T> {
        const url = BaseUrl + entity.entityType + '/' + entity.id;
        const body = omit(entity, ['id', 'entityType']);
        return this.http.put<ResponseData>(url, body).pipe(map(a => {
            a.data['entityType'] = entity.entityType;
            return a.data;
        }));
    }

    public delete<T extends Entity>(entity: T): Observable<T> {
        const url = BaseUrl + entity.entityType + '/' + entity.id;
        return this.http.delete<ResponseData>(url).pipe(map(a => {
            a.data['entityType'] = entity.entityType;
            return a.data;
        }));
    }
}
