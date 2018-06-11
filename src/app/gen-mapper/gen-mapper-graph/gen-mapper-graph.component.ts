import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GenMapperGraph } from './gen-mapper-graph.service';
import { EditNodeDialogComponent } from '../dialogs/edit-node-dialog/edit-node-dialog.component';
import { GMTemplate } from '../gen-mapper.interface';

@Component({
    selector: 'app-gen-mapper-graph',
    templateUrl: './gen-mapper-graph.component.html',
    styleUrls: ['./gen-mapper-graph.component.scss']
})
export class GenMapperGraphComponent implements AfterViewInit {

    public graph: GenMapperGraph;

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
        this.graph = new GenMapperGraph(this.template, this.graphSvg, {});

        this.graph.confirmDelete = (message: string, commitDelete: Function) => {
            this.dialog
                .open(ConfirmDialogComponent, { data: { promp: message } })
                .afterClosed()
                .subscribe(result => {
                    if (result) { commitDelete(); }
                });
        };

        this.graph.onSelectNode = (d: any): void => {
            this.dialog
                .open(EditNodeDialogComponent, { data: { nodeData: d, template: this.template } })
                .afterClosed()
                .subscribe(result => {
                    console.log(result);
                });
        };
    }
}
