import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity, EntityType, IEntity } from '@npl-data-access';
import { omit } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export const BaseUrl = environment.apiBase;

interface ResponseData<T> {
    data: T;
    status: string;
}

@Injectable()
export class EntityService {
    constructor(
        private http: HttpClient
    ) { }

    public customPost<T>(endpoint: string, data: any) {
        const url = BaseUrl + endpoint;
        return this.http.post<T>(url, data).pipe(map(response => response));
    }

    public customGet<T>(endpoint: String): Observable<T> {
        const url = BaseUrl + endpoint;
        return this.http.get<T>(url).pipe(map(response => response));
    }

    public customPut<T>(endpoint: String, data: any): Observable<T> {
        const url = BaseUrl + endpoint;
        return this.http.put<T>(url, data).pipe(map(response => response));
    }

    public getAll<T>(entityType: EntityType): Observable<T[]> {
        const url = BaseUrl + entityType;
        return this.http.get<T[]>(url).pipe(map((a => {
            a.forEach((node: T) => {
                node['entityType'] = entityType;
            });
            return a;
        })));
    }

    public get<T>(entityType: EntityType, guid: string): Observable<T> {
        const url = BaseUrl + entityType + '/' + guid;
        return this.http.get<ResponseData<T>>(url).pipe(map((a => {
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

        return this.http.post<T>(url, body).pipe(map(d => {
            d['entityType'] = entity.entityType;
            return d;
        }));
    }

    public update<T extends Entity>(entity: T): Observable<T> {
        const url = BaseUrl + entity.entityType + '/' + entity.id;
        const body = omit(entity, ['id', 'entityType']);
        return this.http.put<T>(url, body).pipe(map(a => {
            a['entityType'] = entity.entityType;
            return a;
        }));
    }

    public delete<T extends Entity>(entity: T): Observable<T> {
        const url = BaseUrl + entity.entityType + '/' + entity.id;
        return this.http.delete<T>(url).pipe(map(a => {
            a['entityType'] = entity.entityType;
            return a;
        }));
    }
}
