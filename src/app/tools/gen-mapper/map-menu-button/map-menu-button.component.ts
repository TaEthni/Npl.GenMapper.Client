import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DownloadService } from '@core/download.service';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GMTemplate } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';

@Component({
    selector: 'app-map-menu-button',
    templateUrl: './map-menu-button.component.html',
    styleUrls: ['./map-menu-button.component.scss']
})
export class MapMenuButtonComponent {

    @Input()
    public document: DocumentDto;

    @Input()
    public template: GMTemplate;

    constructor(
        private downloadService: DownloadService,
        private genMapper: GenMapperService,
        private dialog: MatDialog,
        private router: Router,
    ) { }

    public onImport(): void {
        this.dialog
            .open(FileInputDialogComponent, { minWidth: '400px' })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this._createDocument(result);
                }
            });
    }

    public onDelete(): void {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: { title: 'Delete ' + this.document.title }
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this._deleteDocument();
                }
            });
    }

    public onExport(): void {
        this.downloadService.downloadDocument(this.document);
    }

    private _createDocument(document: DocumentDto): void {
        this.genMapper
            .createDocument(document)
            .subscribe(doc => {
                this.router.navigate([this.template.name, doc.id]);
            });
    }

    private _deleteDocument(): void {
        this.genMapper
            .removeDocument(this.document)
            .subscribe(() => {
                this.router.navigate([this.template.name]);
            });
    }
}
