import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Device } from '@core/platform';
import { Unsubscribable } from '@core/Unsubscribable';
import { Template } from '@models/template.model';
import { DocumentDto } from '@shared/entity/document.model';
import { takeUntil } from 'rxjs/operators';
import { GNode, NodeDatum } from '../gen-mapper.interface';
import { D3NodeTree } from '../node-tree/d3-node-tree';
import { NodeTreeService } from '../node-tree/node-tree.service';


@Component({
    selector: 'app-gen-mapper-graph',
    templateUrl: './gen-mapper-graph.component.html',
    styleUrls: ['./gen-mapper-graph.component.scss']
})
export class GenMapperGraphComponent extends Unsubscribable implements AfterViewInit, OnChanges {
    @Input()
    public document: DocumentDto;

    @Input()
    public template: Template;

    @Output()
    public change = new EventEmitter<GNode[]>(null);

    @Output()
    public nodeClick = new EventEmitter<GNode>(null);

    @Output()
    public addNode = new EventEmitter<GNode>(null);

    @ViewChild('genMapperGraphSvg', { static: true })
    public graphSvg: ElementRef;

    public d3NodeTree: D3NodeTree;
    private _updating: boolean;
    private _documentId: string;

    constructor(
        private elementRef: ElementRef,
        private nodeTree: NodeTreeService
    ) { super(); }

    @HostListener('window:resize')
    public onWindowResize(): void {
        this.d3NodeTree.resize();
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

        if (this.d3NodeTree) {
            // Only recenter graph if there is a new document.
            const recenterGraph = this.document.id !== this._documentId;

            // Set updating property to prevent onChange from firing.
            this._updating = true;

            // update graph
            // this.graph.update(this.document.nodes, recenterGraph);

            if (this.nodeTree.treeData) {
                this.d3NodeTree.update(this.nodeTree.treeData, recenterGraph);
            }
        }

        // Only set the document ID if it is a saved document.
        // The documentId is used to determine when to recenter the graph on a change.
        if (this.document && this.document.id !== 'local') {
            this._documentId = this.document.id;
        } else {
            this._documentId = null;
        }
    }

    private _createGraph(): void {
        this.d3NodeTree = new D3NodeTree(this.template);
        this.d3NodeTree.attach(this.elementRef.nativeElement);

        if (this.nodeTree.treeData) {
            this.d3NodeTree.update(this.nodeTree.treeData);
        }

        this.d3NodeTree.editButtonClick
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((node: NodeDatum) => {
                this.nodeClick.emit(node.data);
            });

        this.d3NodeTree.nodeClick
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((node: NodeDatum) => {

                if (Device.isDesktop) {
                    this.nodeClick.emit(node.data);
                }
            });

        this.d3NodeTree.addButtonClick
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(d => {
                this.addNode.emit(d.data);
            });
    }
}
