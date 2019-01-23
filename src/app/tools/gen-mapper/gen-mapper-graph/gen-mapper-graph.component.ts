import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDto } from '@shared/entity/document.model';
import { take } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { EditNodeDialogComponent, EditNodeDialogResponse } from '../dialogs/edit-node-dialog/edit-node-dialog.component';
import { GenMap } from '../gen-map';
import { GMTemplate, GNode } from '../gen-mapper.interface';
import { NodeClipboardService } from '../node-clipboard.service';
import { cloneDeep } from 'lodash';
import { LocaleService } from '@core/locale.service';

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

    @ViewChild('genMapperGraphSvg')
    public graphSvg: ElementRef;

    constructor(
        private locale: LocaleService,
        private dialog: MatDialog,
        private nodeClipboard: NodeClipboardService,
        private elementRef: ElementRef
    ) { }

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

    private _createGraph(): void {
        this.graph = new GenMap(this.graphSvg, this.template, this.document.nodes);

        this.graph.init();

        this.graph.onChange = (data: GNode[]) => {
            if (!this._updating) {
                this.change.emit(data);
            }
            this._updating = false;
        };

        this.graph.onCopyNode = (nodes: GNode[]) => { };

        this.graph.onPasteNode = (d: any) => { };

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

        this.graph.nodeClick = (node: any) => {
            this.dialog
                .open(EditNodeDialogComponent, {
                    minWidth: '400px',
                    data: {
                        nodeData: node.data,
                        template: this.template,
                        language: this.graph.language,
                        nodes: this.graph.data
                    }
                })
                .afterClosed()
                .subscribe((result: EditNodeDialogResponse) => {
                    if (!result || result.isCancel) {
                        return;
                    }

                    if (result.isImportSubtree) {
                        this.graph.csvIntoNode(node, result.content);
                    }

                    if (result.isUpdate) {
                        this.graph.updateNode(result.data);
                    }
                });
        };
    }
}
