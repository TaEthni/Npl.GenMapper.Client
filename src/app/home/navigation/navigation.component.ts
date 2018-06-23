import { Component, Input, OnInit } from '@angular/core';
import { User } from '@shared/user.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    @Input()
    public authenticated: boolean;

    @Input()
    public user: User = null;

    public tools = [
        {
            name: 'Church Circles',
            route: '/church-circles'
        },
        {
            name: 'Four Fields',
            route: '/four-fields'
        }
    ];

    constructor() { }

    public ngOnInit(): void {
    }
}
