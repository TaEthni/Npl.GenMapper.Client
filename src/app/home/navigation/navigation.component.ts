import { Component, Input, OnInit } from '@angular/core';
import { User } from '@shared/user.model';
import { MatDialog } from '@angular/material';
import { FeedbackDialogComponent } from '../dialogs/feedback-dialog/feedback-dialog.component';
import { HelpDialogComponent } from '../dialogs/help-dialog/help-dialog.component';

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
        this.dialog.open(FeedbackDialogComponent);
    }

    public help(): void {
        this.dialog.open(HelpDialogComponent);
    }
}
