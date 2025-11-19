import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { DownloadService } from '@npl-core/download.service';

@Component({
    selector: 'app-invalid-csv-dialog',
    templateUrl: './invalid-csv-dialog.component.html',
    styleUrls: ['./invalid-csv-dialog.component.scss']
})
export class InvalidCsvDialogComponent {
    constructor(
        private downloadService: DownloadService,
        @Inject(MAT_DIALOG_DATA) private data: { content: string }
    ) { }

    public exportCSV(): void {
        this.downloadService.downloadCSV(this.data.content, 'INVALID_CSV_EXPORT');
    }
}
