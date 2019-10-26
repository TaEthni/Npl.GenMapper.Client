import { GMField } from '@templates';
import * as d3 from 'd3';
import { drag, DragBehavior, event as d3Event, HierarchyNode, HierarchyPointNode, select, Selection, stratify, tree, TreeLayout, zoom, zoomIdentity, zoomTransform } from 'd3';
import * as _ from 'lodash';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import * as uuid from 'uuid/v4';
import { GNode, NodeDatum } from '../gen-mapper.interface';
import { Template } from '../template.model';
import { parseTransform } from './d3-util';
import { drawLinks } from './draw-links';
import { drawNodes } from './draw-nodes';


export class D3NodeTree {
    private tree: TreeLayout<GNode>;
    private treeData: HierarchyPointNode<GNode>;
    private rootNode: NodeDatum;
    private nodes: NodeDatum[];

    private dragBehavior: DragBehavior<Element, {}, {} | d3.SubjectPosition>;
    private zoom: any;

    private svg: Selection<SVGElement, any, any, undefined>;
    private g: Selection<SVGGElement, any, SVGElement, undefined>;
    private gNodes: Selection<SVGGElement, NodeDatum, SVGElement, undefined>;
    private gLinks: Selection<SVGGElement, NodeDatum, SVGElement, undefined>;
    private gLinksText: Selection<SVGGElement, NodeDatum, SVGElement, undefined>;

    private margin = { top: 110, right: 30, bottom: 50, left: 30 };
    private draggingNode: NodeDatum;
    private draggingNodeSiblings: NodeDatum[];
    private data: GNode[];

    private _dragStarted: boolean;
    private _dragStartEvent: MouseEvent;

    private readonly _nodeClick = new Subject<NodeDatum>();
    private readonly _addButtonClick = new Subject<NodeDatum>();
    private readonly _editButtonClick = new Subject<NodeDatum>();
    private readonly _dataChange = new Subject<GNode[]>();

    public get dataChange() { return this._dataChange.asObservable(); }
    public get nodeClick() { return this._nodeClick.asObservable(); }
    public get addButtonClick() { return this._addButtonClick.asObservable(); }
    public get editButtonClick() { return this._editButtonClick.asObservable(); }

    public onChange = (v: GNode[]) => { };
    public onCopyNode = (v: GNode[]) => { };
    public onPasteNode = (d: HierarchyNode<any>) => { };

    private element: HTMLElement;

    constructor(
        private template: Template,
    ) { }

    public detach(): void {
        this.svg.remove();
        this.element = null;
        this.svg = null;
        this.treeData = null;
        this.treeData = null;
    }

    public attach(element: HTMLElement): void {
        const self = this;
        this.element = element;
        this.svg = select(this.element).select<SVGElement>('svg');

        this.zoom = zoom()
            .scaleExtent([0.05, 2])
            .on('zoom', () => {
                d3.select('g').attr('transform', d3Event.transform);
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

        this.tree = tree<GNode>()
            .nodeSize([
                this.template.svgSettings.nodeWidth,
                this.template.svgSettings.nodeHeight
            ])
            .separation((a, b) => {
                return a.parent === b.parent ? 1 : 1.2;
            });
    }

    public update(content: GNode[], originalPosition: boolean = true): void {
        this.data = content || this.data;

        if (originalPosition) {
            this.originalPosition();
        }

        this.rootNode = stratify<GNode>()
            .id(d => d.id)
            .parentId(d => d.parentId)(this.data) as NodeDatum;

        this.draw(this.rootNode);
    }

    public redraw(): void {
        this.update(this.data, false);
    }

    public draw(source: NodeDatum) {
        const treeData = this.tree(this.rootNode);
        const nodes = treeData.descendants() as NodeDatum[];
        const links = treeData.descendants().slice(1) as NodeDatum[];
        const linkTexts = treeData.descendants().slice(1) as NodeDatum[];

        this.treeData = treeData;
        this.nodes = nodes;

        this.nodes.forEach(node => {
            node.sort((a, b) => a.data.nodeOrder - b.data.nodeOrder)
            node.isRoot = node.parent === this.rootNode;
            node.id = node.data.id;
        });

        const node = this.gNodes
            .selectAll<SVGGElement, NodeDatum>('g.node')
            .data(this.nodes);

        const link = this.gLinks
            .selectAll<SVGPathElement, NodeDatum>('path.link')
            .data(links, (d) => d.id);

        const linkText = this.gLinksText
            .selectAll<SVGTextElement, NodeDatum>('text.link-text')
            .data(linkTexts, (d) => d.id);


        drawLinks(link, linkText, this.template);

        const newNode = drawNodes(node, source, this.template);

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

        this._dataChange.next(this.data);
    }

    public onDragStart(node: NodeDatum, element: Element): void {
    }

    public onDragged(node: NodeDatum, element: Element): void {
    }

    public onDragEnd(node: NodeDatum, element: Element): void {
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

    public addNode(node: any): void {
        const newNodeData: any = {};

        this.template.fields.forEach((field: GMField) => {
            newNodeData[field.id] = field.defaultValue;
        });

        newNodeData.id = uuid();
        newNodeData.parentId = node.data.id;

        this.data.push(newNodeData);
        this.redraw();
        this.centerNodeById(newNodeData.id);
        this.focusNodeById(newNodeData.id);
    }

    public updateNode(newData: any): void {
        const nodeToUpdate = this.data.find((d: any) => d.id === newData.id);
        if (nodeToUpdate) {
            Object.assign(nodeToUpdate, newData);
            this.redraw();
        }
    }

    public removeNode(node: any): void {
        if (!node.parent) {
            return;
        }

        this._deleteAllDescendants(node);
        const nodeToDelete = _.filter(this.data, { id: node.data.id });
        if (nodeToDelete) {
            this.data = _.without(this.data, nodeToDelete[0]) as GNode[];
            this.redraw();
        }
    }

    public overwriteNode(d: NodeDatum, data: GNode[]): void {
        this._deleteAllDescendants(d);
        // replace node by root of imported
        const nodeToDelete: any = this.data.find(n => n.id === d.data.id);
        const rowRootOfImported: GNode = data.find(n => !n.parentId);
        const mapOldIdToNewId = {};
        mapOldIdToNewId[rowRootOfImported.id] = nodeToDelete.id;
        data = _.without(data, rowRootOfImported);
        rowRootOfImported.id = nodeToDelete.id;
        rowRootOfImported.parentId = nodeToDelete.parentId;
        this.data[_.indexOf(this.data, nodeToDelete)] = rowRootOfImported;

        const idsUnsorted = _.map(this.data, function (row: any): string { return row.id; });
        const ids = idsUnsorted.sort((a: any, b: any): any => a - b);
        // update ids of other nodes and push into data
        // while (data.length > 0) {
        //     const row = data.shift();
        //     if (!(row.id in mapOldIdToNewId)) {
        //         const newId = findNewIdFromArray(ids);
        //         mapOldIdToNewId[row.id] = newId;
        //         ids.push(newId);
        //     }
        //     if (!(row.parentId in mapOldIdToNewId)) {
        //         const newId = findNewIdFromArray(ids);
        //         mapOldIdToNewId[row.parentId] = newId;
        //         ids.push(newId);
        //     }
        //     // change id and parentId
        //     row.id = mapOldIdToNewId[row.id];
        //     row.parentId = mapOldIdToNewId[row.parentId];
        //     this.data.push(row);
        // }

        this.redraw();
    }

    public pasteNode(d: NodeDatum, copiedNodes: GNode[]): void {
        this.overwriteNode(d, cloneDeep(copiedNodes));
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
        const node = this.getGraphNodeByDataId(id);
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

    /**
     * @private Data Parsing Methods
     */
    private _deleteAllDescendants(node: NodeDatum): void {
        let idsToDelete = _.map(node.children, (row) => row.id);
        while (idsToDelete.length > 0) {
            const currentId = idsToDelete.pop();
            const childrenIdsToDelete = _.map(_.filter(this.data, { parentId: currentId }), (row: any) => row.id);
            idsToDelete = idsToDelete.concat(childrenIdsToDelete);
            const nodeToDelete = _.filter(this.data, { id: currentId });
            if (nodeToDelete) { this.data = _.without(this.data, nodeToDelete[0]) as GNode[]; }
        }
    }


}

