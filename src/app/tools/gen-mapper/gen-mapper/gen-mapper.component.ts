import { Component, HostBinding, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { LocaleService } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { cloneDeep, some } from 'lodash';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { CreateDocumentDialogComponent } from '../dialogs/create-document-dialog/create-document-dialog.component';
import { InvalidCsvDialogComponent } from '../dialogs/invalid-csv-dialog/invalid-csv-dialog.component';
import { GenMapperContainerComponent } from '../gen-mapper-container/gen-mapper-container.component';
import { GenMapperGraphComponent } from '../gen-mapper-graph/gen-mapper-graph.component';
import { GenMapperView } from '../gen-mapper-view.enum';
import { GNode } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { NodeClipboardService } from '../node-clipboard.service';
import { NodeTreeService } from '../node-tree/node-tree.service';
import {
    SavingErrorSnackbarComponent,
    SavingErrorSnackBarConfig
} from '../snackbars/saving-error-snackbar/saving-error-snackbar.component';
import { SavingSnackbarComponent, SavingSnackBarConfig } from '../snackbars/saving-snackbar/saving-snackbar.component';
import { TemplateUtils } from '../template-utils';
import { Template } from '../template.model';
import { CSVToJSON } from '../resources/csv-to-json';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@core/entity.service';
import { EntityType } from '@shared/entity/entity.model';
import { PeopleGroupService } from '../dialogs/people-group-dialog/people-group.service';
import { PeopleGroupDialogComponent } from '../dialogs/people-group-dialog/people-group-dialog.component';

@Component({
    selector: 'app-gen-mapper',
    templateUrl: './gen-mapper.component.html',
    styleUrls: ['./gen-mapper.component.scss'],
    providers: [NodeTreeService]
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

    private _savingSnackBar: MatSnackBarRef<SavingSnackbarComponent>;
    private _savingErrorSnackBar: MatSnackBarRef<SavingErrorSnackbarComponent>;

    constructor(
        private pgService: PeopleGroupService,
        private authService: AuthenticationService,
        private genMapper: GenMapperService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private locale: LocaleService,
        private nodeTree: NodeTreeService,
        private nodeClipboard: NodeClipboardService,
        @Optional() public genMapperContainer: GenMapperContainerComponent
    ) {
        super();
        this.genMapperContainer.view = this.view;
    }

    public ngOnInit(): void {
        // console.log('ngOnInit');
        // this.dialog.open(PeopleGroupDialogComponent);

        const snapshot = this.route.snapshot;
        const data = snapshot.parent.data;
        this.template = data.config.template;
        this.isAuthenticated = this.authService.isAuthenticated();

        this.nodeTree.createLayout(this.template);

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
                    if (this.nodeTree.validateTree(this.document.nodes)) {
                        this.nodeTree.createTree(this.document.nodes);
                        this.showMapView = some(this.document.nodes, d => !!d.location);
                    } else {
                        this.showBadDocumentDialog(this.document.content);
                    }
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
        this.changeGraph(nodes).subscribe();
    }

    public changeGraph(nodes: GNode[]): Observable<DocumentDto> {
        this.document.nodes = nodes;

        this.showSavingSnackBar();

        // Changing the document reference triggers a change.
        this.document = cloneDeep(this.document);
        this.genMapper.setDocument(this.document);
        this.showMapView = some(this.document.nodes, d => !!d.location);

        return this.genMapper.updateDocument(this.document)
            .pipe(tap(
                success => {
                    this.dismissSavingSnackBar();
                },
                error => {
                    this.showSavingErrorSnackBar();
                }
            ));
    }

    public onNodeClick(node: GNode): void {
        this.genMapper.setNode(node);
    }

    public onAddNode(parentNode: GNode): void {
        const newNode = this.nodeTree.addChildNodeToParent(parentNode);
        // Show SnackBar with undo
        this.changeGraph(this.nodeTree.getData()).subscribe(() => {
            this.genMapperGraph.d3NodeTree.centerNodeById(newNode.id);

            this.snackBar.open(this.locale.t('Common_ChildNodeAdded'), 'Undo', { duration: 10000 }).onAction().subscribe(() => {
                this.nodeTree.removeNode(newNode);
                this.onGraphChange(this.nodeTree.getData());
            });
        });
    }

    public onUpdateNode(node: GNode): void {
        this.nodeTree.updateNode(node);
        this.onGraphChange(this.nodeTree.getData());
    }

    public onDeleteNode(node: GNode): void {
        const nodeDatum = this.nodeTree.getNodeDatumById(node.id);
        const name = nodeDatum.data.name || nodeDatum.data.leaderName || 'No Name';
        const hasChildren = nodeDatum.children && nodeDatum.children.length;
        const localeKey = hasChildren ? 'Message_confirmDeleteGroupWithChildren' : 'Message_confirmDeleteGroup';
        const message = this.locale.t(localeKey, { groupName: name });
        const descendants = nodeDatum.descendants().map(d => d.data);
        const items = descendants.map(d => d.name || d.leaderName || d.leadersName || 'No Name');
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    alert: message,
                    items: items,
                    title: this.locale.t('Message_confirmDelete', { groupName: name })
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    const originalData = cloneDeep(this.nodeTree.getData());
                    this.nodeTree.removeNode(node);
                    this.changeGraph(this.nodeTree.getData()).subscribe(() => {
                        this.snackBar
                            .open(this.locale.t('Common_GroupDeleted'), this.locale.t('Common_Undo'), { duration: 10000 })
                            .onAction()
                            .subscribe(() => {
                                this.nodeTree.createTree(originalData);
                                this.onGraphChange(originalData);
                            });
                    });
                }
            });
    }

    public onCopyNode(node: GNode): void {
        const clonedData = this.nodeTree.cloneNodeTree(node);
        this.nodeClipboard.set(clonedData);
        this.snackBar.open(this.locale.t('Common_CopiedNodeToClipboard'), this.locale.t('Common_Ok'), { duration: 5000 });
    }

    public onReplaceNode(node: GNode): void {
        const originalData = cloneDeep(this.nodeTree.getData());
        const clonedData = this.nodeClipboard.getValue();

        this.nodeTree.replaceNode(node, clonedData);

        this.changeGraph(this.nodeTree.getData()).subscribe(() => {
            this.snackBar
                .open(this.locale.t('Common_NodeHasBeenReplaced'), this.locale.t('Common_Undo'), { duration: 20000 })
                .onAction()
                .subscribe(() => {
                    this.nodeTree.createTree(originalData);
                    this.onGraphChange(this.nodeTree.getData());
                });
        });
    }

    public onPasteAsChildNode(node: GNode): void {
        const originalData = cloneDeep(this.nodeTree.getData());
        const clonedData = this.nodeClipboard.getValue();

        this.nodeTree.insertChildNodes(node, clonedData);
        this.changeGraph(this.nodeTree.getData()).subscribe(() => {
            this.snackBar
                .open(this.locale.t('Common_ChildNodeAdded'), this.locale.t('Common_Undo'), { duration: 20000 })
                .onAction()
                .subscribe(() => {
                    this.nodeTree.createTree(originalData);
                    this.onGraphChange(this.nodeTree.getData());
                });
        });
    }

    public onImportSubtree(content: string): void {
        if (!content) {
            return;
        }

        const originalData = cloneDeep(this.nodeTree.getData());
        const parsedCSV = CSVToJSON(content, this.template);

        if (!this.nodeTree.validateTree(parsedCSV)) {
            return this.showBadDocumentDialog(content);
        }

        this.nodeTree.insertChildNodes(this.node, parsedCSV);
        this.changeGraph(this.nodeTree.getData()).subscribe(() => {
            this.snackBar
                .open(this.locale.t('Common_SubtreeImported'), this.locale.t('Common_Undo'), { duration: 10000 })
                .onAction()
                .subscribe(() => {
                    this.nodeTree.createTree(originalData);
                    this.onGraphChange(this.nodeTree.getData());
                });
        });
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
                    const nodes = CSVToJSON(result.content, this.template);
                    if (this.nodeTree.validateTree(nodes)) {
                        this.createDocument(result);
                    } else {
                        this.showBadDocumentDialog(result.content);
                    }
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

    private showBadDocumentDialog(content: string): void {
        this.dialog.open(InvalidCsvDialogComponent, {
            data: { content }
        });
    }

    private showSavingSnackBar(): void {
        this.snackBar.dismiss();
        this._savingSnackBar = this.snackBar.openFromComponent(SavingSnackbarComponent, new SavingSnackBarConfig());
    }

    private dismissSavingSnackBar(): void {
        if (this._savingSnackBar) {
            this._savingSnackBar.dismiss();
            this._savingSnackBar = null;
        }
    }

    private showSavingErrorSnackBar(): void {
        this.snackBar.dismiss();
        this._savingErrorSnackBar = this.snackBar.openFromComponent(
            SavingErrorSnackbarComponent,
            new SavingErrorSnackBarConfig()
        );
    }

    private dismissSavingErrorSnackBar(): void {
        if (this._savingErrorSnackBar) {
            this._savingErrorSnackBar.dismiss();
            this._savingErrorSnackBar = null;
        }
    }
}
