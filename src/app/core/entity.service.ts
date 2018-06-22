import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityType } from '@shared/entity.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


export const BaseUrl = 'http://api.noplaceleft.tools/';


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
        return this.http.get<ResponseData>(url).pipe(map((a => a.data)));
    }

    public get<T>(entityType: EntityType, guid: string): Observable<T> {
        const url = BaseUrl + entityType + '/' + guid;
        return this.http.get<ResponseData>(url).pipe(map((a => a.data)));
    }
}
