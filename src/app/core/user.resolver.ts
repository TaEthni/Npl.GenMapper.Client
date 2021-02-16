import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserProfile } from '@npl-models/UserProfile.model';
import { Observable } from 'rxjs/Observable';
import { filter, take } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';



@Injectable()
export class UserResolver implements Resolve<Observable<UserProfile>> {
    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<UserProfile> {
        this.authService.refreshUser();
        return this.authService.getUser().pipe(
            filter(u => !!u),
            take(1)
        );
    }
}
