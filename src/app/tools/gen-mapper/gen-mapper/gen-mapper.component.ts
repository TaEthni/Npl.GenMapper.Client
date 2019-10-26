import { Component, HostBinding, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { GMTemplate } from '@templates';
import { cloneDeep, some } from 'lodash';
import { takeUntil } from 'rxjs/operators';

import { CreateDocumentDialogComponent } from '../dialogs/create-document-dialog/create-document-dialog.component';
import { GenMapperContainerComponent } from '../gen-mapper-container/gen-mapper-container.component';
import { GenMapperGraphComponent } from '../gen-mapper-graph/gen-mapper-graph.component';
import { GenMapperView } from '../gen-mapper-view.enum';
import { GNode, PrintType } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { LocaleService } from '@core/locale.service';
import { TemplateUtils } from '../template-utils';
import { parseCSVData } from '../resources/csv-parser';
import { Template } from '../template.model';
import uuid from 'uuid';


@Component({
    selector: 'app-gen-mapper',
    templateUrl: './gen-mapper.component.html',
    styleUrls: ['./gen-mapper.component.scss']
})
export class GenMapperComponent extends Unsubscribable implements OnInit {
    @ViewChild(GenMapperGraphComponent, { static: false })
    public genMapperGraph: GenMapperGraphComponent;

    @HostBinding('class.is-authenticated')
    public isAuthenticated: boolean;

    public template: Template;
    public node: GNode;
    public document: DocumentDto;
    public documents: DocumentDto[];
    public showMapView: boolean;
    public showReportsView: boolean;
    public viewTypes = GenMapperView;
    public view = GenMapperView.GenMap;

    constructor(
        private authService: AuthenticationService,
        private genMapper: GenMapperService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private locale: LocaleService,
        @Optional() public genMapperContainer: GenMapperContainerComponent
    ) {
        super();
        this.genMapperContainer.view = this.view;
    }

    public ngOnInit(): void {
        const snapshot = this.route.snapshot;
        const data = snapshot.parent.data;
        this.template = data.config.template;
        this.isAuthenticated = this.authService.isAuthenticated();

        if (this.template.reports) {
            this.showReportsView = true;
        }

        this.locale.get().pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            TemplateUtils.setTemplateLocale(this.template, this.locale);
        });

        this.route.data
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.document = result.document;
                if (!result.document && !this.authService.isAuthenticated() && this.genMapper.hasLocalDocument()) {
                    this.router.navigate([this.template.id, 'local'], { skipLocationChange: true });
                }

                if (this.document) {
                    this.showMapView = some(this.document.nodes, d => !!d.location);
                }

                if (this.view === GenMapperView.Reports) {
                    this.view = GenMapperView.GenMap;
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

    public setView(view: GenMapperView): void {
        if (this.document) {
            this.view = view;
            this.genMapperContainer.view = this.view;
        }
    }

    public onGraphChange(nodes: GNode[]): void {
        this.document.nodes = nodes;
        this.genMapper.updateDocument(this.document)
            .subscribe(result => {
                this.document = cloneDeep(this.document);
                // Changing the document reference triggers a change.
                this.genMapper.setDocument(this.document);
                this.showMapView = some(this.document.nodes, d => !!d.location);
            });
    }

    public onNodeClick(node: GNode): void {
        this.genMapper.setNode(node);
    }

    public onAddNode(node: GNode): void {
        const newNode = {} as GNode;

        newNode.id = uuid();
        newNode.parentId = node.id;
        newNode.nodeOrder = 1000;

        this.template.fields.forEach(field => {
            if (field.defaultValue) {
                newNode[field.id] = field.defaultValue;
            }
        });

        this.document.nodes.push(node);
        this.onGraphChange(this.document.nodes);
    }

    public onUpdateNode(node: GNode): void {
        const nodeToUpdate = this.document.nodes.find((d: any) => d.id === node.id);
        if (nodeToUpdate) {
            if (this.genMapperGraph) {
                this.genMapperGraph.graph.update(this.document.nodes, false);
            } else {
                this.onGraphChange(this.document.nodes);
            }
        }
    }

    public onCopyNode(node: GNode): void {
        this.genMapperGraph.copyNode(node);
    }

    public onPasteNode(node: GNode): void {
        this.genMapperGraph.pasteNode(node);
    }

    public onImportSubtree(content: string): void {
        if (!content) {
            return;
        }

        const parsedCSV = parseCSVData(content, this.template);

        this.genMapperGraph.importSubtree(this.node, parsedCSV);
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

    public onDeleteNode(node: GNode): void {
        this.genMapperGraph.deleteNode(node);
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
