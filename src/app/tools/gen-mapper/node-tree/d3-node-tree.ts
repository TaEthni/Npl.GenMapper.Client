import { NodeDto } from '@models/node.model';
import { Template } from '@models/template.model';
import * as d3 from 'd3';
import { drag, DragBehavior, event as d3Event, HierarchyNode, HierarchyPointNode, select, Selection, tree, TreeLayout, zoom, zoomIdentity, zoomTransform } from 'd3';
import { Subject } from 'rxjs';
import { NodeDatum } from '../gen-mapper.interface';
import { parseTransform } from './d3-util';
import { drawLinks, elbow } from './draw-links';
import { drawNodes } from './draw-nodes';


export class D3NodeTree {
    private tree: TreeLayout<NodeDto>;
    private rootNode: NodeDatum;
    private nodes: NodeDatum[];
    private treeData: HierarchyPointNode<NodeDto>;
    private dragBehavior: DragBehavior<Element, {}, {} | d3.SubjectPosition>;
    private zoom: any;

    private svg: Selection<SVGElement, any, any, undefined>;
    private g: Selection<SVGGElement, any, SVGElement, undefined>;
    private gNodes: Selection<SVGGElement, NodeDatum, SVGElement, undefined>;
    private gLinks: Selection<SVGGElement, NodeDatum, SVGElement, undefined>;
    private gLinksText: Selection<SVGGElement, NodeDatum, SVGElement, undefined>;

    private margin = { top: 110, right: 30, bottom: 50, left: 30 };
    private data: NodeDto[];
    private draggingNode: NodeDatum;
    private draggingNodeSiblings: NodeDatum[];

    private _dragStarted: boolean;
    private _dragStartEvent: MouseEvent;
    private _zooming: boolean;

    private readonly _nodeClick = new Subject<NodeDatum>();
    private readonly _addButtonClick = new Subject<NodeDatum>();
    private readonly _editButtonClick = new Subject<NodeDatum>();
    private readonly _sortOrderChange = new Subject<NodeDto[]>();
    private readonly _dataChange = new Subject<NodeDto[]>();

    public get dataChange() { return this._dataChange.asObservable(); }
    public get nodeClick() { return this._nodeClick.asObservable(); }
    public get addButtonClick() { return this._addButtonClick.asObservable(); }
    public get editButtonClick() { return this._editButtonClick.asObservable(); }
    public get sortOrderChange() { return this._sortOrderChange.asObservable(); }

    public onChange = (v: NodeDto[]) => { };
    public onCopyNode = (v: NodeDto[]) => { };
    public onPasteNode = (d: HierarchyNode<any>) => { };

    private element: HTMLElement;

    constructor(
        private template: Template,
    ) { }

    public detach(): void {
        this.svg.remove();
        this.element = null;
        this.svg = null;
    }

    public attach(element: HTMLElement): void {
        const self = this;
        this.element = element;
        this.svg = select(this.element).select<SVGElement>('#genmapper-graph-svg');

        this.zoom = zoom()
            .scaleExtent([0.05, 2])
            .on('start', () => this._zooming = true)
            .on('zoom', () => {
                this._zooming = true;
                d3.select('g').attr('transform', d3Event.transform);
            })
            .on('end', () => {
                this._zooming = false;
            });

        this.dragBehavior = drag<Element, NodeDatum>()
            .subject(d => d)
            .on('start', function (d: NodeDatum): void { self.onDragStart(d, this); })
            .on('drag', function (d: NodeDatum): void { self.onDragged(d, this); })
            .on('end', function (d: NodeDatum): void { self.onDragEnd(d, this); })

        this.svg
            .call(this.zoom)
            .on('dblclick.zoom', null)
            .on('click', (d) => {
                this.unFocusAllNodes();
            });

        this.g = this.svg
            .append<SVGGElement>('g')
            .attr('id', 'maingroup');

        this.gLinks = this.g
            .append<SVGGElement>('g')
            .attr('class', 'group-links');

        this.gLinksText = this.g
            .append('g')
            .attr('class', 'group-links-text');

        this.gNodes = this.g
            .append<SVGGElement>('g')
            .attr('class', 'group-nodes');

        this.tree = tree<NodeDto>()
            .nodeSize([
                this.template.svgSettings.nodeWidth,
                this.template.svgSettings.nodeHeight
            ])
            .separation((a, b) => {
                return a.parent === b.parent ? 1 : 1.2;
            });
    }

    public update(treeData: HierarchyPointNode<NodeDto>, originalPosition: boolean = true): void {

        if (originalPosition) {
            this.originalPosition();
        }

        this.draw(treeData);
    }

    public draw(treeData: HierarchyPointNode<NodeDto>, source?: NodeDatum) {
        this.treeData = treeData;
        const nodes = treeData.descendants() as NodeDatum[];
        const links = treeData.descendants().slice(1) as NodeDatum[];
        const linkTexts = treeData.descendants().slice(1) as NodeDatum[];

        this.rootNode = nodes.find(n => !n.parent);

        this.nodes = nodes;

        this.nodes.forEach(node => {
            node.x0 = node.x;
            node.y0 = node.y;
        });

        const node = this.gNodes
            .selectAll<SVGGElement, NodeDatum>('g.node')
            .data(this.nodes, (d) => d.id);

        const link = this.gLinks
            .selectAll<SVGPathElement, NodeDatum>('path.link')
            .data(links, (d) => d.id);

        const linkText = this.gLinksText
            .selectAll<SVGTextElement, NodeDatum>('text.link-text')
            .data(linkTexts, (d) => d.id);

        select(this.element).select('.loading-spinner').classed('hidden', false);

        requestAnimationFrame(() => {
            drawLinks(link, linkText, this.template);
            const newNode = drawNodes(node, source, this as any);

            newNode.on('click', (d) => {
                d3Event.stopPropagation();
                this.unFocusAllNodes();
                this.focusNodeById(d.data.id);
                this._nodeClick.next(d);
            });

            newNode
                .select('.addChildNode')
                .on('click', (d) => {
                    d3Event.stopPropagation();
                    this._addButtonClick.next(d);
                });

            newNode
                .select('.editNode')
                .on('click', (d) => {
                    d3Event.stopPropagation();
                    this.unFocusAllNodes();
                    this.focusNodeById(d.data.id);
                    this._editButtonClick.next(d);
                });
        });

        requestAnimationFrame(() => {
            select(this.element).select('.loading-spinner').classed('hidden', true);
        });

        this._dataChange.next(this.data);
    }

    public onDragStart(node: NodeDatum, element: Element): void {
        // console.log(node);
        if (this._isDraggingDisabled(node)) {
            return;
        }

        if (this._zooming) { return; }

        this._dragStarted = true;
        this._dragStartEvent = d3Event.sourceEvent;
        this._dragStartEvent.stopPropagation();
    }

    public onDragged(node: NodeDatum, element: Element): void {
        if (this._isDraggingDisabled(node)) {
            return;
        }

        if (this._zooming) { return; }

        // If this is the first drag event after the start event occurred.
        if (this._dragStarted) {
            this.draggingNode = node;
            this.draggingNodeSiblings = node.parent.children;

            // D3 drag.clickDistance does not work... This is a workaround.
            // Prevent dragging if the mouse does not move at least 10PX.
            let delta = d3Event.sourceEvent.clientX - this._dragStartEvent.clientX;
            if (delta < 0) { delta = delta * -1; }
            if (delta < 10) {
                return;
            }

            // Set up graph before starting to drag the node.
            this._initializeDrag(node, element);
            this._dragStarted = false;
        }

        const newXCord = node.x0 + d3Event.dx;

        // this.panWhileDragging();

        // update X coords
        node.x0 = newXCord;

        // Update Node with new X coords
        select(element)
            .attr('transform', (d: any) => 'translate(' + d.x0 + ', ' + d.y0 + ')');

        // Update link to parent with new elbow
        this.svg.selectAll<SVGPathElement, NodeDatum>('path.link')
            .data([node], d => d.id) // filters the links down to the list provided.
            .attr('d', (d) => elbow(this.template)(d
                // {
                //     x: node.x0,
                //     y: node.y0
                // },
                // node.parent
            ));
    }

    public onDragEnd(node: NodeDatum, element: Element): void {
        if (this._isDraggingDisabled(node)) {
            return;
        }

        // Stop panning.
        // This is necessary if the user let go of the node while panning.
        // this.stopPanning();

        if (this.draggingNode) {
            let newOrder: number = 0;

            const sibs = this.draggingNodeSiblings.filter(n => n.id !== this.draggingNode.id);

            sibs.forEach((n, i, l) => {
                if (n.x0 < node.x0) {
                    newOrder++;
                }
            });

            // console.log(sibs);

            const isNewOrder = newOrder !== this.draggingNode.data.attributes.nodeOrder;

            // console.log(newOrder);

            // Update sibling nodeOrder, only if the new order changed
            if (isNewOrder) {
                // Insert node into newOrder index
                sibs.splice(newOrder, 0, node);

                // ForEach item in list, set new node order
                sibs.forEach((n, i) => n.data.attributes.nodeOrder = i);

                // Sort the nodes sibling
                // this.draggingNode.parent.sort((a, b) => a.data.attributes.nodeOrder - b.data.attributes.nodeOrder);
            } else {
                this.draw(this.treeData);
            }

            // console.log(isNewOrder);

            // Draw
            this.draggingNode = null;
            this.draggingNodeSiblings = null;

            select(element).classed('dragging', false);

            if (isNewOrder) {
                this._sortOrderChange.next(sibs.map(s => s.data));
            }

            this.svg.classed('dragging-node', false);
        }

        this._dragStarted = false;
        this._dragStartEvent = null;
    }

    private _initializeDrag(draggingNode: NodeDatum, domNode: Element): void {
        const draggingNodes = draggingNode.descendants();
        const nodesToRemove = draggingNodes.filter(d => d.id !== draggingNode.id);

        // add class .dragging to dragged node group
        select(domNode).classed('dragging', true);

        // add class to <SVG> to indicate dragging state.
        this.svg.classed('dragging-node', true);

        // This sets the Z-Index above all other nodes, by moving the dragged node to be the last-child.
        this.svg
            .selectAll<SVGElement, NodeDatum>('g.node')
            .sort((a, b) => { // select the parent and sort the path's
                if (a.id !== draggingNode.id) {
                    return -1; // a is not the hovered element, send "a" to the back
                } else {
                    return 1; // a is the hovered element, bring "a" to the front
                }
            });

        if (nodesToRemove.length > 0) {
            // remove all links, but not from data
            this.svg
                .selectAll<SVGPathElement, any>('path.link')
                .data(nodesToRemove, d => d.id)
                .remove();

            // Remove all descendant nodes from the SVG, but not from the data.
            this.svg
                .selectAll<SVGGElement, any>('g.node')
                .data(nodesToRemove, d => d.id)
                .remove();

            this.svg
                .selectAll<SVGElement, any>('text.new-generation')
                .data(draggingNodes, d => d.id)
                .remove();
        }

        // const selectedNode = this.nodes.find(n => n.data.isSelected);
        // if (selectedNode) {
        //     const sidenav = document.querySelector('mat-drawer.node-detail');
        //     this._sideNavPanOffset = sidenav.clientWidth;
        // }
    }

    private _isDraggingDisabled(draggingNode: NodeDatum): boolean {
        // Ignore Drag if RootNode
        if (draggingNode === this.rootNode) {
            return true;
        }

        // Ignore Drag if only child
        if (draggingNode.parent.children.length < 2) {
            return true;
        }

        return false;
    }

    public onZoomInClick(): void {
        this.zoom.scaleBy(this.svg, 1.2);
    }

    public onZoomOutClick(): void {
        this.zoom.scaleBy(this.svg, 1 / 1.2);
    }

    public getGraphNodeByDataId(id: string): NodeDatum {
        return this.nodes.find(d => d.data.id === id);
    }

    public resize(): void {
        // this.svg
        //     .attr('height', window.innerHeight)
        //     .attr('width', window.innerWidth);
    }

    /**
     * @public Map manipulation methods
     */
    public originalPosition(): void {
        if (!this.svg || !this.element) {
            return;
        }

        this.zoom.scaleTo(this.svg, 1);
        const origX = this.margin.left + (this.element.clientWidth / 2);
        const origY = this.margin.top;
        const parsedTransform = parseTransform(this.g.attr('transform'));
        this.zoom.translateBy(this.svg, origX - parsedTransform.translate[0], origY - parsedTransform.translate[1]);
    }

    public centerNodeById(id: string): void {
        requestAnimationFrame(() => {
            const node = this.nodes.find(d => d.data.id === id);
            this.centerNodeDatum(node);
        });
    }

    public centerNodeDatum(node: NodeDatum): void {
        const height = this.element.clientHeight;
        const width = this.element.clientWidth;
        const t = zoomTransform(this.svg.node());
        let x = -node['x'];
        let y = -node['y'];
        x = x * t.k + width / 2;
        y = y * t.k + height / 2;
        this.svg
            .transition()
            .duration(1000)
            .call(this.zoom.transform, zoomIdentity.translate(x, y).scale(t.k));
    }

    private unFocusAllNodes(): void {
        this.svg.selectAll('.node').classed('is-focused', false);
    }

    private focusNodeById(id: string): void {
        this.svg.select(`.node[node-id="${id}"]`).classed('is-focused', true);
    }
}

