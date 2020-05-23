import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { CSVToJSON } from '@core/csv-to-json';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@models/document.model';
import { Template } from '@models/template.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { CreateDocumentDialogComponent } from '../../dialogs/create-document-dialog/create-document-dialog.component';
import { InvalidCsvDialogComponent } from '../../dialogs/invalid-csv-dialog/invalid-csv-dialog.component';
import { GNode } from '../../gen-mapper.interface';
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
        private authService: AuthenticationService,
        private genMapper: GenMapperService,
        private dialog: MatDialog,
        private router: Router,
        private nodeTree: NodeTreeService
    ) { super(); }

    public ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated();

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
        if (!this.authService.isAuthenticated() && this.genMapper.hasLocalDocument()) {
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

    private createDocument(doc: DocumentDto, nodes?: GNode[]): void {
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
