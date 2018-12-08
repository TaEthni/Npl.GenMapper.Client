import { Component, Input, OnInit } from '@angular/core';
import { User } from '@shared/user.model';
import { MatDialog } from '@angular/material';
import { SupportDialogComponent, SupportDialogConfig } from '../support-dialog/support-dialog.component';

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

    constructor(
        private dialog: MatDialog
    ) { }

    public ngOnInit(): void {
    }

    public goto(event: Event, url: string): void {
        event.preventDefault();
        event.stopPropagation();
        window.open(url, '_blank');
    }

    public sendFeedback(): void {
        this.dialog.open<SupportDialogComponent, SupportDialogConfig, void>(SupportDialogComponent, {
            data: {
                authenticated: this.authenticated,
                user: this.user,
                isFeedback: true,
            }
        });
    }

    public help(): void {
        this.dialog.open<SupportDialogComponent, SupportDialogConfig, void>(SupportDialogComponent, {
            data: {
                authenticated: this.authenticated,
                user: this.user,
                isFeedback: false,
            }
        });
    }
}
