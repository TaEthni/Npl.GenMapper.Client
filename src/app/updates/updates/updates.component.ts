import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UpdatesService } from '../updates.service';
import { WhatsNewDialogComponent } from '../whats-new-dialog/whats-new-dialog.component';

const oldKeys = [
    'update-v1',
    'update-v2',
    'update-v3',
    'update-v4',
    'update-v5',
];

oldKeys.forEach(key => localStorage.removeItem(key));

@Component({
    selector: 'app-updates',
    templateUrl: './updates.component.html',
    styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

    private updateKey = 'update-v6';

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
