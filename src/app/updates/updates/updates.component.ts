import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdatesService } from '../updates.service';
import { WhatsNewDialogComponent } from '../whats-new-dialog/whats-new-dialog.component';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.component.html',
    styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

    private updateKey = 'update-v3';

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
                if (result) {
                    localStorage.setItem(this.updateKey, 'true');
                }
            });
    }
}
