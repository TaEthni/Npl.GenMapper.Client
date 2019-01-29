import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { takeUntil } from 'rxjs/operators';

import { CreateDocumentDialogComponent } from '../dialogs/create-document-dialog/create-document-dialog.component';
import { GMTemplate, GNode, PrintType } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { GenMapperGraphComponent } from '../gen-mapper-graph/gen-mapper-graph.component';
import { cloneDeep } from 'lodash';
import { NodeClipboardService } from '../node-clipboard.service';

@Component({
    selector: 'app-gen-mapper',
    templateUrl: './gen-mapper.component.html',
    styleUrls: ['./gen-mapper.component.scss']
})
export class GenMapperComponent extends Unsubscribable implements OnInit {
    @ViewChild(GenMapperGraphComponent)
    public genMapperGraph: GenMapperGraphComponent;

    public template: GMTemplate;
    public node: GNode;
    public document: DocumentDto;
    public documents: DocumentDto[];
    public isAuthenticated: boolean;

    constructor(
        private authService: AuthenticationService,
        private nodeClipboard: NodeClipboardService,
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

        this.genMapper.getNode()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.node = result;
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

    public onNodeClick(node: GNode): void {
        this.genMapper.setNode(node);
    }

    public onUpdateNode(node: GNode): void {
        this.genMapperGraph.graph.updateNode(node);
    }

    public onCopyNode(node: GNode): void {
        this.genMapperGraph.copyNode(node);
    }

    public onPasteNode(node: GNode): void {
        this.genMapperGraph.pasteNode(node);
    }

    public onImportSubtree(content: string): void {
        this.genMapperGraph.importSubtree(this.node, content);
    }

    public onPrint(printType: PrintType): void {
        this.genMapperGraph.graph.printMap(printType);
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

    public onNodeDrawerOpenChanged(opened: boolean): void {
        if (!opened) {
            this.genMapper.setNode(null);
        }
    }

    private createDocument(doc?: DocumentDto): void {
        this.genMapper.createDocument(doc).subscribe(result => {
            this.router.navigate([this.template.name, result.id]);
        });
    }
}