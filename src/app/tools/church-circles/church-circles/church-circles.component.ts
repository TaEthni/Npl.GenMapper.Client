import { Component, OnInit } from '@angular/core';
import { template } from '../template';
import { GMTemplate } from '../../../gen-mapper/gen-mapper.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';
import { TokenService } from '@core/token.service';
import { FormGroup } from '@angular/forms';
import { EntityService } from '@core/entity.service';
import { EntityType } from '@shared/entity.model';
import { Document } from '@shared/document.model';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { DocumentsDialogComponent } from '@shared/documents-dialog/documents-dialog.component';

@Component({
    selector: 'app-church-circles',
    templateUrl: './church-circles.component.html',
    styleUrls: ['./church-circles.component.scss']
})
export class ChurchCirclesComponent extends Unsubscribable implements OnInit {

    public template: GMTemplate = template;
    public document: any;
    public isAuthenticated: boolean;
    public form: FormGroup;
    public documents: Document[];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _matDialog: MatDialog,
        private _tokenService: TokenService,
        private _entityService: EntityService,
    ) { super(); }

    public ngOnInit(): void {

        this._tokenService.get()
            .pipe(takeUntil(this.unsubsribe))
            .subscribe((token) => {
                this.isAuthenticated = token.isAuthenticated;

                if (this.isAuthenticated) {
                    this._loadDocuments().subscribe(documents => {
                        this.documents = documents;
                    });
                }
            });

        this._route.params
            .pipe(takeUntil(this.unsubsribe))
            .subscribe(params => {
                if (params.id) {
                    this.loadGraph(params.id);
                }
            });
    }

    public selectDocument(document: Document): void {
        this._router.navigate([document.id], { relativeTo: this._route });
    }

    public showDocuments(): void {
        if (this.documents) {
            this._showDocumentsDialog(this.documents);
        } else {
            this._loadDocuments().subscribe((documents) => {
                this._showDocumentsDialog(documents);
            });
        }
    }

    public createNew(): void {
        this._router.navigate(['new'], { relativeTo: this._route });
    }

    private _createForm(): void {

    }

    private loadGraph(id: string): void {

        if (id === 'new') {
            const doc = new Document();
            doc.title = 'New Document';
            this.document = document;
            return;
        }

        this._entityService
            .get<Document>(EntityType.Documents, id)
            .subscribe(result => {
                this.document = result;
            });
    }

    private _loadDocuments(): Observable<Document[]> {
        return this._entityService.getAll<Document>(EntityType.Documents);

    }

    private _showDocumentsDialog(documents: Document[]): void {
        const dialogRef = this._matDialog.open(DocumentsDialogComponent, {
            minWidth: '500px',
            data: { documents }
        });

        dialogRef
            .afterClosed()
            .subscribe(document => {
                if (document) {
                    this.selectDocument(document);
                }
            });
    }
}
