import { Component, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Device } from '@npl-core/platform';
import { DocumentDto } from '@npl-data-access';
import { GMTemplate } from '@npl-template';

import { CreateDocumentDialogComponent } from '../dialogs/create-document-dialog/create-document-dialog.component';
import { GenMapperService } from '../gen-mapper.service';

@Component({
    selector: 'app-documents-sidenav',
    templateUrl: './documents-sidenav.component.html',
    styleUrls: ['./documents-sidenav.component.scss']
})
export class DocumentsSidenavComponent {

    @Input()
    public documents: DocumentDto[];

    @Input()
    public document: DocumentDto;

    @Input()
    public template: GMTemplate;

    constructor(
        private genMapper: GenMapperService,
        private dialog: MatDialog,
        private router: Router,
        private drawer: MatDrawer,
    ) { }

    public onCreateDocument(): void {
        this.dialog.open(CreateDocumentDialogComponent)
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.createDocument(result);
                }
            });
    }

    public onSelectDocument(doc: DocumentDto): void {
        this.router.navigate(['/gen-mapper', this.template.id, doc.id]);
        if (Device.isHandHeld) {
            this.drawer.close();
        }
    }

    public createDocument(doc: DocumentDto): void {
        doc = new DocumentDto(doc);
        this.genMapper.createDocument(doc)
            .subscribe(result => {
                this.router.navigate(['/gen-mapper', this.template.id, result.id]);
            });
    }
}
