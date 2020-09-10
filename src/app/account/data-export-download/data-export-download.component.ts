import { Component, OnInit } from '@angular/core';
import { EntityService } from '@core/entity.service';
import { result } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from '@core/download.service';

@Component({
    selector: 'app-data-export-download',
    templateUrl: './data-export-download.component.html',
    styleUrls: ['./data-export-download.component.scss']
})
export class DataExportDownloadComponent implements OnInit {

    public isLoading: boolean = true;
    public data: any;
    public noDataError: boolean;

    constructor(
        private downloadService: DownloadService,
        private entityService: EntityService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit() {
        const sessionId = this.route.snapshot.params.sessionId;
        this.entityService.customGet<any[]>(`export/cotw/${sessionId}`).subscribe(result => {
            this.isLoading = false;
            this.data = result;

            if (!result || result.length === 0) {
                this.noDataError = true;
            }
        });
    }

    public download(): void {
        this.downloadService.downloadJsonToCSV(this.data);
    }
}
