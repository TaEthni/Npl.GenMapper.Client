import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GenMapperGraph } from './gen-mapper-graph.service';

export interface GMSvg {
    type: string;
    attribute: any;
    style?: any;
}

export interface GMSettings {
    nodeSize: { width: number, height: number };
}

export interface GMSvgSet {
    [key: string]: GMSvg;
}

export interface GMField {
    header: string;
    initial: number;
    initialTranslationCode?: string;
    type: string;
    svg?: GMSvgSet;
    inheritsFrom?: string;
    class?: any;
    values?: any;
}

export interface GMTemplate {
    name: string;
    translations: any;
    settings: any;
    svg: any;
    fields: GMField[];
}

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
        const ttid = setTimeout(() => {
            this._createGraph();

            clearTimeout(ttid);
        }, 1000);
    }

    private _createGraph(): void {
        this.graph = new GenMapperGraph(this.template, this.graphSvg);

        this.graph.confirmDelete = (message: string, commitDelete: Function) => {
            this.dialog
                .open(ConfirmDialogComponent, { data: { promp: message } })
                .afterClosed()
                .subscribe(result => {
                    if (result) { commitDelete(); }
                });
        };
    }
}
