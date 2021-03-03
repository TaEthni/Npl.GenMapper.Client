import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    ChangePasswordDto,
    ChangeUserEmailDto,
    ChangeUserNameDto,
    GetRecoveryCodeDto,
    MFACodeDto,
    MFACodeVerifyDto,
    RegistrationDto,
} from '../dtos';
import { IDP_BASE_URL } from '../idp-base-url.token';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {
    public constructor(
        private http: HttpClient,
        @Inject(IDP_BASE_URL) private baseUrl: string
    ) { }

    public register(dto: RegistrationDto): Observable<void> {
        return this.http.post<void>(this.baseUrl + 'account/register', dto);
    }

    public changeEmail(dto: ChangeUserEmailDto): Observable<void> {
        return this.http.post<void>(this.baseUrl + 'account/updateEmail', dto);
    }

    public changeUserName(dto: ChangeUserNameDto): Observable<void> {
        return this.http.post<void>(this.baseUrl + 'account/changeUserName', dto);
    }

    public changePassword(dto: ChangePasswordDto): Observable<void> {
        return this.http.post<void>(this.baseUrl + 'account/changePassword', dto);
    }

    public getMFACode(): Observable<MFACodeDto> {
        return this.http.get<MFACodeDto>(this.baseUrl + 'account/getMFACode');
    }

    public verifyMFACode(dto: MFACodeVerifyDto): Observable<void> {
        return this.http.post<void>(this.baseUrl + 'account/verifyMFACode', dto);
    }

    public enableMFA(): Observable<void> {
        return this.http.patch<void>(this.baseUrl + 'account/enableMFA', undefined);
    }

    public disableMFA(): Observable<void> {
        return this.http.patch<void>(this.baseUrl + 'account/disableMFA', undefined);
    }

    public resetMFA(): Observable<GetRecoveryCodeDto> {
        return this.http.patch<GetRecoveryCodeDto>(this.baseUrl + 'account/resetMFA', undefined);
    }

    public getRecoveryCodes(): Observable<GetRecoveryCodeDto> {
        return this.http.get<GetRecoveryCodeDto>(this.baseUrl + 'account/getRecoveryCode');
    }
}
