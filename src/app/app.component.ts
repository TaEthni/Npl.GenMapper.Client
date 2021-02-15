import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@npl-core/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthenticationService,
        private http: HttpClient
    ) { }

    public ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.authService.refreshUser();
        }

        this.http.get('https://localhost:7001/identity/self').subscribe(result => {
            console.log(result);
        });
    }
}
