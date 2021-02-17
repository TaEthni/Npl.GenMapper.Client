import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Device } from '@npl-core/platform';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { NodeDto, Template } from '@npl-data-access';
import { takeUntil } from 'rxjs/operators';

import { NodeDatum } from '../../gen-mapper.interface';
import { D3NodeTree } from '../../node-tree/d3-node-tree';
import { NodeTreeService } from '../../node-tree/node-tree.service';


@Component({
    selector: 'app-gen-mapper-graph',
    templateUrl: './gen-mapper-graph.component.html',
    styleUrls: ['./gen-mapper-graph.component.scss']
})
export class GenMapperGraphComponent extends Unsubscribable implements AfterViewInit, OnInit {
    @Input()
    public template: Template;

    @Output()
    public change = new EventEmitter<NodeDto[]>(null);

    @Output()
    public nodeClick = new EventEmitter<NodeDto>(null);

    @Output()
    public addNode = new EventEmitter<NodeDto>(null);

    @Output()
    public sortChange = new EventEmitter<NodeDto[]>();

    @ViewChild('genMapperGraphSvg')
    public graphSvg: ElementRef;

    public d3NodeTree: D3NodeTree;

    constructor(
        private elementRef: ElementRef,
        private nodeTree: NodeTreeService,
        private ngZone: NgZone,
    ) { super(); }

    @HostListener('window:resize')
    public onWindowResize(): void {
        this.d3NodeTree.resize();
    }

    public ngOnInit(): void {
        this.nodeTree.treeData$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                if (result && this.d3NodeTree) {
                    this.ngZone.run(() => {
                        this.d3NodeTree.update(result, false);
                    });
                }
            });
    }

    public ngAfterViewInit(): void {
        // This is a bad practice, but it is the only way to make this work
        const ttid = setTimeout(() => {
            this._createGraph();
            clearTimeout(ttid);
        }, 1000);
    }

    public centerGraphOnNode(nodeId: string): void {
        if (this.d3NodeTree) {
            this.d3NodeTree.centerNodeById(nodeId);
        }
    }

    public recenterGraph(): void {
        if (this.d3NodeTree) {
            this.d3NodeTree.originalPosition();
        }
    }

    private _createGraph(): void {
        this.d3NodeTree = new D3NodeTree(this.template);
        this.d3NodeTree.attach(this.elementRef.nativeElement);

        this.ngZone.run(() => {
            if (this.nodeTree.treeData) {
                this.d3NodeTree.update(this.nodeTree.treeData);
            }
        });

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

        this.d3NodeTree.sortOrderChange
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.sortChange.emit(result);
            });
    }
}
