import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api-base-url';
import { TeamMemberUpdateDto } from '../dtos';
import { TeamMember } from '../models';

@Injectable({
    providedIn: 'root',
})
export class TeamMembersService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_BASE_URL) private baseUrl: string
    ) {
        this.url = this.baseUrl + 'teams';
    }

    public loadMembers(teamId: string): Observable<TeamMember[]> {
        return this.http.get<TeamMember[]>(`${this.url}/${teamId}/members`);
    }

    public update(teamId: string, id: string, dto: TeamMemberUpdateDto): Observable<TeamMember> {
        return this.http.put<TeamMember>(`${this.url}/${teamId}/members/${id}`, dto);
    }

    public remove(teamId: string, id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${teamId}/members/${id}`);
    }
}
