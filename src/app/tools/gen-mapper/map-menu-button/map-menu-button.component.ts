import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DownloadService } from '@core/download.service';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GMTemplate, PrintType } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { LocaleService } from '@core/locale.service';

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

    @Output()
    public print = new EventEmitter<string>();

    constructor(
        private locale: LocaleService,
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
        const title = this.locale.t('deleteDocument') + ` [${this.document.title}]`;
        this.dialog
            .open(ConfirmDialogComponent, {
                data: { title }
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

    public onPrintHorizontal(): void {
        this.print.emit(PrintType.horizontal);
    }

    public onPrintVertical(): void {
        this.print.emit(PrintType.vertical);
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
