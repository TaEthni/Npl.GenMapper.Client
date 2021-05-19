import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api-base-url';
import { TeamCreateDto, TeamUpdateDto } from '../dtos';
import { Team } from '../models';

@Injectable({
    providedIn: 'root',
})
export class TeamsService {

    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_BASE_URL) private baseUrl: string
    ) {
        this.url = this.baseUrl + 'teams/';
    }

    public load(): Observable<Team[]> {
        return this.http.get<Team[]>(this.url);
    }

    public create(dto: TeamCreateDto): Observable<Team> {
        return this.http.post<Team>(this.url, dto);
    }

    public update(id: string, dto: TeamUpdateDto): Observable<Team> {
        return this.http.put<Team>(this.url + id, dto);
    }
}
