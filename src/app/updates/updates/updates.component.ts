import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WhatsNewDialogComponent } from '../whats-new-dialog/whats-new-dialog.component';
import { UpdatesService } from '../updates.service';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.component.html',
    styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

    private updateKey = 'update-v2';

    constructor(
        private dialog: MatDialog,
        private service: UpdatesService
    ) { }

    public ngOnInit(): void {
        this.service.get().subscribe(() => this.showDialog());

        if (!localStorage.getItem(this.updateKey)) {
            this.showDialog();
        }
    }

    private showDialog(): void {
        this.dialog
            .open(WhatsNewDialogComponent,
                {
                    autoFocus: false
                }
            )
            .afterClosed()
            .subscribe(result => {
                localStorage.setItem('update-v1', 'true');
            });
    }
}
