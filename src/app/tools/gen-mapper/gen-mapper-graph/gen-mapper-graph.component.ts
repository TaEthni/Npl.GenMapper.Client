import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { LocaleService } from '@core/locale.service';
import { DocumentDto } from '@shared/entity/document.model';
import { HierarchyNode } from 'd3';
import { cloneDeep } from 'lodash';
import { take } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GenMap } from '../gen-map';
import { GNode } from '../gen-mapper.interface';
import { NodeClipboardService } from '../node-clipboard.service';
import { GMTemplate } from '@templates';
import { Template } from '../template.model';

@Component({
    selector: 'app-gen-mapper-graph',
    templateUrl: './gen-mapper-graph.component.html',
    styleUrls: ['./gen-mapper-graph.component.scss']
})
export class GenMapperGraphComponent implements AfterViewInit, OnChanges {
    @Input()
    public document: DocumentDto;

    @Input()
    public template: Template;

    @Output()
    public change: EventEmitter<GNode[]> = new EventEmitter<GNode[]>(null);

    @Output()
    public nodeClick: EventEmitter<GNode> = new EventEmitter<GNode>(null);

    @ViewChild('genMapperGraphSvg')
    public graphSvg: ElementRef;

    public graph: GenMap;
    private _updating: boolean;
    private _documentId: string;

    constructor(
        private locale: LocaleService,
        private dialog: MatDialog,
        private nodeClipboard: NodeClipboardService,
        private snackBar: MatSnackBar,
        private elementRef: ElementRef
    ) { }

    @HostListener('window:resize')
    public onWindowResize(): void {
        this.graph.resize();
    }

    public ngAfterViewInit(): void {
        // This is a bad practice, but it is the only way to make this work
        const ttid = setTimeout(() => {
            this._createGraph();
            clearTimeout(ttid);
        }, 1000);
    }

    public ngOnChanges(simpleChanges: SimpleChanges): void {
        if (simpleChanges.document.firstChange) {
            if (this.document) {
                this._documentId = this.document.id;
            }

            return;
        }

        if (this.graph) {
            // Only recenter graph if there is a new document.
            const recenterGraph = this.document.id !== this._documentId;

            // Set updating property to prevent onChange from firing.
            this._updating = true;

            // update graph
            this.graph.update(this.document.nodes, recenterGraph);
        }

        // Only set the document ID if it is a saved document.
        // The documentId is used to determine when to recenter the graph on a change.
        if (this.document && this.document.id !== 'local') {
            this._documentId = this.document.id;
        } else {
            this._documentId = null;
        }
    }

    public copyNode(node: GNode): void {
        const graphNode = this.graph.getGraphNodeByDataId(node.id);
        const descendants = cloneDeep(graphNode.descendants().map(d => d.data));
        const same = descendants.find(d => d.id === graphNode.data.id);
        same.parentId = '';
        this.nodeClipboard.set(descendants);
        this.snackBar.open(this.locale.t('copiedNodeToClipboard'), 'Ok', { duration: 5000 });
    }

    public pasteNode(node: GNode): void {
        const graphNode = this.graph.getGraphNodeByDataId(node.id);
        const copiedNodes = this.nodeClipboard.getValue();
        const originalData = cloneDeep(this.graph.data);

        this.graph.pasteNode(graphNode, copiedNodes);
        this.showUndoPaste(originalData);
    }

    public importSubtree(node: GNode, content: string): void {
        const graphNode = this.graph.getGraphNodeByDataId(node.id);
        this.graph.csvIntoNode(graphNode, content);
        this.snackBar.open(this.locale.t('subtreeImportedPastTense'), 'Ok', { duration: 5000 });
    }

    public deleteNode(node: GNode): void {
        const graphNode = this.graph.getGraphNodeByDataId(node.id);
        const name = graphNode.data.name || graphNode.data.leaderName || 'No Name';
        const hasChildren = graphNode.children && graphNode.children.length;
        const localeKey = hasChildren ? 'Message_confirmDeleteGroupWithChildren' : 'Message_confirmDeleteGroup';
        const message = this.locale.t(localeKey, { groupName: name });
        const descendants = graphNode.descendants().map(d => d.data);
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
                if (result) { this.graph.removeNode(graphNode); }
            });
    }

    private _createGraph(): void {
        this.graph = new GenMap(this.graphSvg, this.template, this.document.nodes);

        this.graph.init();

        this.graph.onChange = (data: GNode[]) => {
            if (!this._updating) {
                this.change.emit(data);
            }
            this._updating = false;
        };

        this.graph.onCopyNode = (nodes: GNode[]) => {
            // Buttons on graph is not implemented
        };

        this.graph.onPasteNode = (d: any) => {
            // Buttons on graph is not implemented
        };

        this.graph.addNodeClick = (d: HierarchyNode<GNode>) => {
            this.graph.addNode(d);
            this.snackBar.open(this.locale.t('childNodeAdded'), 'Ok', { duration: 5000 });
        };

        this.graph.removeNodeClick = (node: any) => {

        };

        this.graph.editNodeClick = (node: any) => {
            this.nodeClick.emit(node.data);
        };
    }

    private showUndoPaste(originalData: GNode[]): void {
        this.snackBar
            .open(this.locale.t('nodeHasBeenReplaces'), this.locale.t('en_Undo'), {
                duration: 20000,
            })
            .onAction()
            .pipe(take(1))
            .subscribe(result => {
                this.graph.redrawData(originalData);
            });
    }
}
