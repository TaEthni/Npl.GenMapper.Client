import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DownloadService } from '@npl-core/download.service';
import { LocaleService } from '@npl-core/locale.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { DocumentDto } from '@npl-models/document.model';
import { GMTemplate } from '@npl-template';
import { take, takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { PrintType } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';

@Component({
    selector: 'app-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent extends Unsubscribable implements OnInit {
    public document: DocumentDto;
    public template: GMTemplate;

    @Output()
    public print = new EventEmitter<string>();

    @Output()
    public settingsButtonClick = new EventEmitter<void>();

    @Output()
    public importButtonClick = new EventEmitter<void>();

    constructor(
        private locale: LocaleService,
        private downloadService: DownloadService,
        private genMapper: GenMapperService,
        private dialog: MatDialog,
        private router: Router
    ) { super(); }

    public ngOnInit(): void {
        this.genMapper.template$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => this.template = result);

        this.genMapper.selectedDocument$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => this.document = result);
    }

    public onImport(): void {
        this.importButtonClick.emit();
    }

    public onDelete(): void {
        const title = this.locale.t('Common_DeleteDocument') + ` [${this.document.title}]`;
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
        this.genMapper.nodes$.pipe(take(1)).subscribe(nodes => {
            this.downloadService.downloadDocument(this.document, nodes);
        });
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

    private _deleteDocument(): void {
        this.genMapper
            .removeDocument(this.document)
            .subscribe(() => {
                this.router.navigate(['/gen-mapper', this.template.id]);
            });
    }
}
