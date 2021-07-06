import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Invite, InviteAcceptDto, InvitesCreateDto, InvitesCreateResponseDto } from '@npl-data-access';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api-base-url';

@Injectable({
    providedIn: 'root'
})
export class InviteService {
    public url: string;
    public constructor(
        private http: HttpClient,
        @Inject(API_BASE_URL) private baseUrl: string
    ) {
        this.url = baseUrl + 'invites';
    }

    public getInviteByCode(code: string): Observable<Invite> {
        return this.http.get<Invite>(`${this.url}/${code}`);
    }

    public getTeamInvites(teamId: string): Observable<Invite[]> {
        return this.http.get<Invite[]>(`${this.url}/team/${teamId}`);
    }

    public sendInvites(dto: InvitesCreateDto): Observable<InvitesCreateResponseDto> {
        return this.http.post<InvitesCreateResponseDto>(this.url, dto);
    }

    public acceptInvite(dto: InviteAcceptDto): Observable<void> {
        return this.http.post<void>(`${this.url}/accept`, dto);
    }

    public resendInvite(inviteId: string): Observable<Invite> {
        return this.http.post<Invite>(`${this.url}/${inviteId}/re-send`, {});
    }

    public cancelInvite(inviteId: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${inviteId}`);
    }
}
