import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this.authenticationService.logout();
        this.router.navigate(['']);
    }
}
