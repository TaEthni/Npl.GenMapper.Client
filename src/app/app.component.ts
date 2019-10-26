import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public thing: string = 'strng';

    constructor(private http: HttpClient, private oauthService: OAuthService) {
        this.oauthService.tokenEndpoint = "http://localhost:8000/oauth/token";

        // Url with user info endpoint
        // This endpont is described by OIDC and provides data about the loggin user
        // This sample uses it, because we don't get an id_token when we use the password flow
        // If you don't want this lib to fetch data about the user (e. g. id, name, email) you can skip this line
        this.oauthService.userinfoEndpoint = "http://localhost:8000/api/user";

        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = "";

        // set the scope for the permissions the client should request
        // this.oauthService.scope = "openid profile email voucher offline_access";
        this.oauthService.scope = "";

        // Set a dummy secret
        // Please note that the auth-server used here demand the client to transmit a client secret, although
        // the standard explicitly cites that the password flow can also be used without it. Using a client secret
        // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
        // Using such a dummy secret is as safe as using no secret.
        this.oauthService.dummyClientSecret = "";
    }

    public ngOnInit(): void {
        this.http.get('http://localhost:8000/api/nodes').subscribe(result => {
            console.log(result);
        })
    }
}
