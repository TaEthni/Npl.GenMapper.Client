import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { takeUntil } from 'rxjs/operators';

import { CreateDocumentDialogComponent } from '../dialogs/create-document-dialog/create-document-dialog.component';
import { GMTemplate, GNode } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';

@Component({
    selector: 'app-gen-mapper',
    templateUrl: './gen-mapper.component.html',
    styleUrls: ['./gen-mapper.component.scss']
})
export class GenMapperComponent extends Unsubscribable implements OnInit {
    public documents: DocumentDto[];
    public document: DocumentDto;
    public template: GMTemplate;
    public isAuthenticated: boolean;

    constructor(
        private authService: AuthenticationService,
        private genMapper: GenMapperService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog
    ) { super(); }

    public ngOnInit(): void {
        const snapshot = this.route.snapshot;
        const data = snapshot.parent.data;
        this.template = data.template;
        this.isAuthenticated = this.authService.isAuthenticated();

        this.route.data
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.document = result.document;
                if (!result.document && !this.authService.isAuthenticated() && this.genMapper.hasLocalDocument()) {
                    this.router.navigate([this.template.name, 'local'], { skipLocationChange: true });
                }
            });

        this.genMapper.getConfig()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.documents = result.documents;
            });
    }

    public onGraphChange(nodes: GNode[]): void {
        this.document.nodes = nodes;
        this.genMapper.updateDocument(this.document)
            .subscribe(result => { console.log('updated'); });
    }

    public onCreateDocument(): void {
        this.dialog.open(CreateDocumentDialogComponent)
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.createDocument(result);
                }
            });
    }

    public onImport(): void {
        this.dialog
            .open(FileInputDialogComponent)
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.createDocument(result);
                }
            });
    }

    private createDocument(doc?: DocumentDto): void {
        this.genMapper.createDocument(doc).subscribe(result => {
            this.router.navigate([this.template.name, result.id]);
        });
    }
}
