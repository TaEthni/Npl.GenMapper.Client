import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityType, Entity } from '@shared/entity.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


export const BaseUrl = 'http://api.noplaceleft.tools/';
// export const BaseUrl = 'http://localhost:9000/';

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
            a.data.forEach(node => {
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
        return this.http.post<ResponseData>(url, entity).pipe(map(d => {
            d.data['entityType'] = entity.entityType;
            return d.data;
        }));
    }

    public update<T extends Entity>(entity: T): Observable<T> {
        const url = BaseUrl + entity.entityType + '/' + entity.id;
        return this.http.put<ResponseData>(url, entity).pipe(map(a => {
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
