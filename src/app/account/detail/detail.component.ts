import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { User } from '@shared/user.model';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    public user: User;

    constructor(private authService: AuthenticationService) { }

    public ngOnInit(): void {
        this.authService.getUser().subscribe(result => {
            this.user = result;
        });
    }
}
