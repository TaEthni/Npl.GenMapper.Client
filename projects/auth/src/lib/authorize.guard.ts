import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { isAuthenticated } from './store';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
    public constructor(
        private authService: AuthService,
        private store: Store<any>,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.store.select(isAuthenticated).pipe(
            map((isAuthorized => {
                console.log('AuthorizationGuard, canActivate isAuthorized: ' + isAuthorized);

                if (!isAuthorized) {
                    this.authService.setPostAuthorizeUrl(state.url);
                    this.authService.login();
                    return this.router.parseUrl('/unauthorized');
                }

                return true;
            })),
            take(1)
        );
    }
}
