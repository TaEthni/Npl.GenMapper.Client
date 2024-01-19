import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService } from '@npl-core/download.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { DocumentDto } from '@npl-data-access';
import { GMTemplate } from '@npl-template';
import { switchMap, take, takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { EditDocumentDialogComponent } from '../dialogs/edit-document-dialog/edit-document-dialog.component';
import { PrintType } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { MigrateStreamDialogComponent } from '../../../oikos/migrate-stream-dialog/migrate-stream-dialog.component';

@Component({
    selector: 'app-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.scss'],
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
        private translate: TranslateService,
        private downloadService: DownloadService,
        private genMapper: GenMapperService,
        private dialog: MatDialog,
        private router: Router
    ) {
        super();
    }

    public ngOnInit(): void {
        this.genMapper.template$.pipe(takeUntil(this.unsubscribe)).subscribe((result) => (this.template = result));

        this.genMapper.selectedDocument$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((result) => (this.document = result));
    }

    public onImport(): void {
        this.importButtonClick.emit();
    }

    public onEdit(): void {
        this.dialog.open(EditDocumentDialogComponent, {
            data: { document: this.document },
        });
    }

    public onDelete(): void {
        const title = this.translate.instant('Common_DeleteDocument') + ` [${this.document.title}]`;
        this.dialog
            .open(ConfirmDialogComponent, {
                data: { title },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this._deleteDocument();
                }
            });
    }

    public onExport(): void {
        this.genMapper.nodes$.pipe(take(1)).subscribe((nodes) => {
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

    public migrate(): void {
        this.genMapper.nodes$.pipe(take(1)).subscribe((nodes) => {
            const root = nodes.find((x) => x.isRoot);
            this.dialog.open(
                MigrateStreamDialogComponent,
                MigrateStreamDialogComponent.configure({
                    template: this.template,
                    document: this.document,
                    rootNodeId: root.id,
                    loadNodes: () => this.genMapper.refreshDocumentNodes().pipe(switchMap(() => this.genMapper.nodes$)),
                })
            );
        });
    }

    private _deleteDocument(): void {
        this.genMapper.removeDocument(this.document).subscribe(() => {
            this.router.navigate(['/gen-mapper', this.template.id]);
        });
    }
}
