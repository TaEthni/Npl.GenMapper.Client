import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity, EntityType } from '@shared/entity/entity.model';
import { omit } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const localUrl = 'http://localhost:9000/api/';
const devUrl = 'https://dev-api.noplaceleft.tools/api/';
const prodUrl = 'https://api.noplaceleft.tools/api/';

let _BaseUrl: string;

if (window.location.host === 'dev.noplaceleft.tools') {
    _BaseUrl = devUrl;
}

if (window.location.host === 'noplaceleft.tools') {
    _BaseUrl = prodUrl;
}

_BaseUrl = devUrl;

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

    public getAll<T>(entityType: EntityType): Observable<T[]> {
        const url = BaseUrl + entityType;
        return this.http.get<ResponseData>(url).pipe(map((a => {
            a.data.forEach((node: Entity) => {
                node['entityType'] = entityType;
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

    public create<T extends Entity>(entity: Entity): Observable<T> {
        const url = BaseUrl + entity.entityType;
        const body = omit(entity, ['id', 'entityType']);
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
