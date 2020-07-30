import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.authService.refreshUser();
        }
    }
}
