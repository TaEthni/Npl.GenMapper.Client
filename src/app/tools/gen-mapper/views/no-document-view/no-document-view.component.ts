import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions, isAuthenticated } from '@npl-auth';
import { CSVToJSON } from '@npl-core/csv-to-json';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, DocumentDto, IFlatNode, Template } from '@npl-data-access';
import { FileInputDialogComponent } from '@npl-shared/file-input-dialog/file-input-dialog.component';
import { takeUntil } from 'rxjs/operators';

import { CreateDocumentDialogComponent } from '../../dialogs/create-document-dialog/create-document-dialog.component';
import { InvalidCsvDialogComponent } from '../../dialogs/invalid-csv-dialog/invalid-csv-dialog.component';
import { GenMapperService } from '../../gen-mapper.service';
import { NodeTreeService } from '../../node-tree/node-tree.service';

@Component({
    selector: 'app-no-document-view',
    templateUrl: './no-document-view.component.html',
    styleUrls: ['./no-document-view.component.scss']
})
export class NoDocumentViewComponent extends Unsubscribable implements OnInit {

    public isAuthenticated: boolean;
    public template: Template;
    public documents: DocumentDto[];

    constructor(
        private store: Store<AppState>,
        private genMapper: GenMapperService,
        private dialog: MatDialog,
        private router: Router,
        private nodeTree: NodeTreeService,
    ) { super(); }

    public ngOnInit(): void {
        this.store.select(isAuthenticated)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.isAuthenticated = result;
            });

        this.genMapper.template$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.template = result;
            });

        this.genMapper.documents$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.documents = result;
            });
    }

    public onCreateDocument(): void {
        if (!this.isAuthenticated && this.genMapper.hasLocalDocument()) {
            this.router.navigate(['/gen-mapper', this.template.id, 'local']);
            return;
        }

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
                    const nodes = CSVToJSON(result.content, this.template);
                    if (this.nodeTree.validateTree(nodes)) {
                        this.createDocument(result, nodes);
                    } else {
                        this.showBadDocumentDialog(result.content);
                    }
                }
            });
    }

    public login(): void {
        this.store.dispatch(AuthActions.login());
    }

    private createDocument(doc: DocumentDto, nodes?: IFlatNode[]): void {
        doc.nodes = nodes as any;
        this.genMapper.createDocument(doc).subscribe(result => {
            this.router.navigate(['/gen-mapper', this.template.id, result.id]);
        });
    }

    private showBadDocumentDialog(content: string): void {
        this.dialog.open(InvalidCsvDialogComponent, {
            data: { content }
        });
    }
}
