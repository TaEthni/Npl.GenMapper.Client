import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { IDPRoles } from './IDPRoles';
import { getUserProfile } from './store';

@Injectable({
    providedIn: 'root'
})
export class DeveloperOnlyGuard implements CanActivate {
    public constructor(
        private store: Store<any>,
        private router: Router
    ) { }

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select(getUserProfile).pipe(filter(u => !!u), map(user => {
            if (user!.role !== IDPRoles.Developer) {
                return this.router.parseUrl('/unauthorized');
            }
            return true;
        }), take(1));
    }
}
