import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { User } from '@models/user.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { filter, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';



@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
    constructor(
        private router: Router,
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
