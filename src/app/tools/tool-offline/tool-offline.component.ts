import { Component, OnInit } from '@angular/core';
import { DocumentDto } from '@shared/document.model';
import { GMTemplate } from '../../gen-mapper/gen-mapper.interface';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { DownloadService } from '@core/download.service';
import { ConfirmDialogComponent } from '../../gen-mapper/dialogs/confirm-dialog/confirm-dialog.component';

const storageKey = 'offline-locall-save-';

@Component({
    selector: 'app-tool-offline',
    templateUrl: './tool-offline.component.html',
    styleUrls: ['./tool-offline.component.scss']
})
export class ToolOfflineComponent implements OnInit {

    public document: DocumentDto;
    public template: GMTemplate;

    constructor(
        private _route: ActivatedRoute,
        private _matDialog: MatDialog,
        private _downloadService: DownloadService
    ) { }

    public ngOnInit(): void {
        this.template = this._route.snapshot.data.template;
        const local = localStorage.getItem(storageKey + this.template.name);

        if (local) {
            this.document = DocumentDto.create(JSON.parse(local));
        } else {
            this.document = DocumentDto.create({ format: this.template.name });
        }
    }

    public onImport(): void {
        this._matDialog
            .open(FileInputDialogComponent, { minWidth: '400px' })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.createDocument(result);
                }
            });
    }

    public onExport(): void {
        this._downloadService.downloadDocument(this.document);
    }

    public onPrint(): void {

    }

    public onDelete(): void {
        this._matDialog
            .open(ConfirmDialogComponent, {
                data: { title: 'Clear the map', alert: 'This will remove all changes. Make sure you export before continuing!' }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.createDocument();
                }
            });
    }

    public onGraphChange(content: string): void {
        this.document.content = content;
        localStorage.setItem(storageKey + this.template.name, JSON.stringify(this.document));
    }

    public createDocument(value: { content?: string, title?: string } = {}): void {
        this.document = DocumentDto.create({
            title: value.title,
            format: this.template.format,
            content: value.content
        });

        localStorage.setItem(storageKey + this.template.name, JSON.stringify(this.document));
    }
}
