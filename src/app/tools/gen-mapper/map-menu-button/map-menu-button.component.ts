import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DownloadService } from '@core/download.service';
import { LocaleService } from '@core/locale.service';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { PrintType } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { GMTemplate } from '@templates';

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

    @Output()
    public settingsButtonClick = new EventEmitter<void>();

    constructor(
        private locale: LocaleService,
        private downloadService: DownloadService,
        private genMapper: GenMapperService,
        private dialog: MatDialog,
        private router: Router,
    ) { }

    public onImport(): void {
        this.dialog
            .open(FileInputDialogComponent, { minWidth: '350px' })
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

    public onSettingsButtonClick(): void {
        this.settingsButtonClick.emit();
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
