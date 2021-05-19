import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { API_BASE_URL } from '@npl-data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TeamOwnerGuard implements CanActivate {
    constructor(
        @Inject(API_BASE_URL)
        private baseUrl: string,
        private http: HttpClient,
        private router: Router
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const teamId = route.params.teamId;
        return this.http.get<{ canEdit: boolean }>(this.baseUrl + `teams/${teamId}/can-edit`).pipe(map(response => {
            return response.canEdit || this.router.parseUrl('/forbidden');
        }));
    }
}
