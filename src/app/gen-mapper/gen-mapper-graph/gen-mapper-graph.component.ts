import { AfterViewInit, Component, ElementRef, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { EditNodeDialogComponent, EditNodeDialogResponse } from '../dialogs/edit-node-dialog/edit-node-dialog.component';
import { GMTemplate } from '../gen-mapper.interface';
import { GenMap } from '../gen-map';
import { DocumentDto } from '@shared/document.model';

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
    public change: EventEmitter<string> = new EventEmitter<string>(null);

    @ViewChild('genMapperGraphSvg')
    public graphSvg: ElementRef;

    constructor(
        private dialog: MatDialog,
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
            this.graph.update(this.document.content);
        }
    }

    private _createGraph(): void {
        this.graph = new GenMap(this.graphSvg, this.template, this.document.content);

        this.graph.init();

        this.graph.onChange = (content: string) => {
            if (!this._updating) {
                this.change.emit(content);
            }
            this._updating = false;
        };

        this.graph.removeNodeClick = (node: any) => {
            const name = node.data.name;
            const hasChildren = node.children && node.children.length;
            const message = hasChildren ? `Delete [${name}] as all it's decendants.` : `Delete [${name}].`;
            this.dialog
                .open(ConfirmDialogComponent, { data: { content: [message], title: 'Confirm Delete?' } })
                .afterClosed()
                .subscribe(result => {
                    if (result) { this.graph.removeNode(node); }
                });
        };

        this.graph.nodeClick = (node: any) => {
            this.dialog
                .open(EditNodeDialogComponent, {
                    minWidth: '400px',
                    data: { nodeData: node.data, template: this.template, language: this.graph.language }
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
