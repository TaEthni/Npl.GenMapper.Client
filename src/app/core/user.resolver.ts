import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { User } from '@shared/user.model';
import { map, filter, take } from 'rxjs/operators';


@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
    constructor(
        private authService: AuthenticationService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<User> {
        this.authService.refreshUser();
        return this.authService.getUser().pipe(
            filter(u => !!u),
            take(1)
        );
    }
}
