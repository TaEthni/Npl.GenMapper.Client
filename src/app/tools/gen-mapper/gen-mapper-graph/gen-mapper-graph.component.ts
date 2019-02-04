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
import { GMTemplate, GNode } from '../gen-mapper.interface';
import { NodeClipboardService } from '../node-clipboard.service';

@Component({
    selector: 'app-gen-mapper-graph',
    templateUrl: './gen-mapper-graph.component.html',
    styleUrls: ['./gen-mapper-graph.component.scss']
})
export class GenMapperGraphComponent implements AfterViewInit, OnChanges {

    public graph: GenMap;
    private _updating: boolean;

    @Input()
    public document: DocumentDto;

    @Input()
    public template: GMTemplate;

    @Output()
    public change: EventEmitter<GNode[]> = new EventEmitter<GNode[]>(null);

    @Output()
    public nodeClick: EventEmitter<GNode> = new EventEmitter<GNode>(null);

    @ViewChild('genMapperGraphSvg')
    public graphSvg: ElementRef;

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
            return;
        }

        if (this.graph) {
            this._updating = true;
            this.graph.update(this.document.nodes);
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
            const name = node.data.name || node.data.leaderName || 'No Name';
            const hasChildren = node.children && node.children.length;
            const localeKey = hasChildren ? 'messages.confirmDeleteGroupWithChildren' : 'messages.confirmDeleteGroup';
            const message = this.locale.t(localeKey, { groupName: name });
            this.dialog
                .open(ConfirmDialogComponent, {
                    data: {
                        content: [message],
                        title: this.locale.t('messages.confirmDelete', { groupName: name })
                    }
                })
                .afterClosed()
                .subscribe(result => {
                    if (result) { this.graph.removeNode(node); }
                });
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
