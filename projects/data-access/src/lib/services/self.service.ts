import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api-base-url';
import { Member } from '../models';


@Injectable({
    providedIn: 'root'
})
export class SelfService {
    constructor(
        private http: HttpClient,
        @Inject(API_BASE_URL) private baseUrl: string
    ) { }

    public get(): Observable<Member> {
        return this.http.get<Member>(this.baseUrl + 'self');
    }

    public acceptAgreement(): Observable<Member> {
        return this.http.post<Member>(this.baseUrl + 'self/agreement', {});
    }
}
