import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GenMapperGraph } from './gen-mapper-graph.service';
import { EditNodeDialogComponent } from '../dialogs/edit-node-dialog/edit-node-dialog.component';
import { GMTemplate } from '../gen-mapper.interface';
import { GenMap } from '../gen-map';

@Component({
    selector: 'app-gen-mapper-graph',
    templateUrl: './gen-mapper-graph.component.html',
    styleUrls: ['./gen-mapper-graph.component.scss']
})
export class GenMapperGraphComponent implements AfterViewInit {

    public graph: GenMap;

    @Input()
    public template: GMTemplate;

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

    private _createGraph(): void {
        this.graph = new GenMap(this.graphSvg, this.template);

        this.graph.init();

        this.graph.removeNodeClick = (node: any) => {
            this.dialog
                .open(ConfirmDialogComponent, { data: { promp: 'Confirm Delete?' } })
                .afterClosed()
                .subscribe(result => {
                    if (result) { this.graph.removeNode(node); }
                });
        };

        this.graph.nodeClick = (node: any) => {
            this.dialog
                .open(EditNodeDialogComponent, { data: { nodeData: node, template: this.template } })
                .afterClosed()
                .subscribe(result => {
                    console.log(result);
                });
        };
    }
}
