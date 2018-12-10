import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from './entity.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AvailabilityResp {
    data: {
        available: boolean;
    };
}

@Injectable()
export class AccountService {

    constructor(
        private http: HttpClient
    ) { }

    public checkUsernameAvailability(username: string): Observable<boolean> {
        return this.http.post<AvailabilityResp>(BaseUrl + 'check/username', { username })
            .pipe(
                map(resp => {
                    return resp.data.available;
                })
            );
    }
}
