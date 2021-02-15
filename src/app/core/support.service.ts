import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportRequest } from '@npl-shared/support-request.model';
import { Observable } from 'rxjs';

import { BaseUrl } from './entity.service';

@Injectable()
export class SupportService {

    constructor(
        private http: HttpClient
    ) { }

    public sendFeedback(feedback: SupportRequest): Observable<void> {
        const url = BaseUrl + 'feedback';
        return this.http.post<void>(url, feedback);
    }

    public sendSupport(support: SupportRequest): Observable<void> {
        const url = BaseUrl + 'support';
        return this.http.post<void>(url, support);
    }
}
