import { Injectable } from '@angular/core';
import { BaseUrl } from './entity.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportRequest } from '@shared/support-request.model';

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
