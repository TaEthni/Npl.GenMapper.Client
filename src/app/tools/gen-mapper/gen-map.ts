import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import i18next from 'i18next';
import * as _ from 'lodash';

import { GNode, PrintType, NodeDatum } from './gen-mapper.interface';
import { TemplateUtils } from './template-utils';
import { HierarchyNode, zoomTransform, zoomIdentity, drag, DragBehavior, event as d3Event } from 'd3';
import { cloneDeep } from 'lodash';
import { Device } from '@core/platform';
import { GMStreamAttribute, GMTemplate, GMField, ControlType, GMSvgAction } from '@templates';
import { GMSvg } from '@templates';
import * as uuid from 'uuid/v4';
import { FileDetector } from 'protractor';
import { Template } from './template.model';
import { parseCSVData } from './resources/csv-parser';

export const MapStyles = {
    boxHeight: 80,
    textHeight: 14,
    textMargin: 6
};

export class GenMap {
    public initialCsv: string;
    public csvHeader: string;
    public language: any;
    public dragBehavior: DragBehavior<Element, {}, {} | d3.SubjectPosition>;
    public zoom: any;
    public svg: any;
    public g: any;
    public nodes: any;
    public gNodes: any;
    public gLinks: any;
    public gLinksText: any;
    // public nodeLabelAttributes: GMStreamAttribute[];

    public nodeLabelFields: GMField[];
    public margin = { top: 110, right: 30, bottom: 50, left: 30 };

    public draggingNode: NodeDatum;
    public draggingNodeSiblings: NodeDatum[];

    private _dragStarted: boolean;
    private _dragStartEvent: MouseEvent;

    public onChange = (v: GNode[]) => { };
    public onCopyNode = (v: GNode[]) => { };
    public onPasteNode = (d: HierarchyNode<any>) => { };

    constructor(
        private graphSvg: ElementRef,
        private template: Template,
        public data?: GNode[],
    ) {
        this.nodeLabelFields = template.fields.filter(f => f.isNodeSvgLabel);
    }

    public init(): void {
        if (this.template.translations[i18next.language]) {
            this.language = i18next.language;
        } else {
            this.language = 'en';
        }

        this._createMap();
    }

    public update(content: GNode[], originalPosition: boolean = true): void {
        this.data = content;
        this.nodes = null;

        if (originalPosition) {
            this.originalPosition();
        }

        this.redraw();
    }

    public redrawData(data: GNode[]): void {
        this.data = data;
        this.redraw();
    }

    public getGraphNodeByDataId(id: string): HierarchyNode<GNode> {
        return this.nodes.descendants().find(d => d.data.id === id);
    }

    public onZoomInClick(): void {
        this.zoom.scaleBy(this.svg, 1.2);
    }

    public onZoomOutClick(): void {
        this.zoom.scaleBy(this.svg, 1 / 1.2);
    }

    public nodeClick = (node: any): void => { };
    private onNodeClick(node: Node): void {
        this.nodeClick(node);
    }

    public editNodeClick = (node: any): void => { };
    private onEditNodeClick(node: Node): void {
        this.editNodeClick(node);
    }

    public addNodeClick = (node: any): void => { this.addNode(node); };
    private onAddNodeClick(node: Node): void {
        this.addNodeClick(node);
    }

    public removeNodeClick = (node: any) => { this.removeNode(node); };
    private onRemoveNodeClick(node: Node): void {
        this.removeNodeClick(node);
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

    public csvIntoNode(d: any, csvString: any): void {
        this._deleteAllDescendants(d);

        const parsedCsv = parseCSVData(csvString, this.template);
        this.overwriteNode(d, parsedCsv);
    }

    public overwriteNode(d: any, data: GNode[]): void {
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
        while (data.length > 0) {
            const row = data.shift();
            if (!(row.id in mapOldIdToNewId)) {
                const newId = findNewIdFromArray(ids);
                mapOldIdToNewId[row.id] = newId;
                ids.push(newId);
            }
            if (!(row.parentId in mapOldIdToNewId)) {
                const newId = findNewIdFromArray(ids);
                mapOldIdToNewId[row.parentId] = newId;
                ids.push(newId);
            }
            // change id and parentId
            row.id = mapOldIdToNewId[row.id];
            row.parentId = mapOldIdToNewId[row.parentId];
            this.data.push(row);
        }

        this.redraw();
    }

    public pasteNode(d: HierarchyNode<GNode>, copiedNodes: GNode[]): void {
        this._deleteAllDescendants(d);
        this.overwriteNode(d, cloneDeep(copiedNodes));
    }

    /**
     * @public Map manipulation methods
     */
    public originalPosition(): void {
        if (!this.svg || !this.graphSvg.nativeElement) {
            return;
        }

        this.zoom.scaleTo(this.svg, 1);
        const origX = this.margin.left + (this.graphSvg.nativeElement.clientWidth / 2);
        const origY = this.margin.top;
        const parsedTransform = _parseTransform(this.g.attr('transform'));
        this.zoom.translateBy(this.svg, origX - parsedTransform.translate[0], origY - parsedTransform.translate[1]);
    }

    public centerNodeById(id: string): void {
        const node = this.getGraphNodeByDataId(id);
        const height = this.graphSvg.nativeElement.clientHeight;
        const width = this.graphSvg.nativeElement.clientWidth;
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

    public onDragStart(node: NodeDatum, element: Element): void {
    }
    public onDragged(node: NodeDatum, element: Element): void {
    }
    public onDragEnd(node: NodeDatum, element: Element): void {
    }

    public printMap(printType: PrintType): void {
        const boxHeight = this.template.svgSettings.boxHeight;

        // calculate width and height of the map (printed rotated by 90 degrees)
        const arrNodes = this.nodes.descendants();
        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;
        for (let i = 0; i < arrNodes.length; i++) {
            const x = arrNodes[i].x;
            const y = arrNodes[i].y;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }

        // store original values
        const origWidth = this.svg.attr('width');
        const origHeight = this.svg.attr('height');
        const origTransform = this.g.attr('transform');

        const totalHeight = Math.max(
            600, this.margin.top + (maxY - minY) + boxHeight + this.margin.top);
        const totalWidthLeft = Math.max(500, -minX + boxHeight * 1.5 / 2 + 20);
        const totalWidthRight = Math.max(500, maxX + boxHeight * 1.5 / 2 + 20);

        let translateX, translateY;

        if (printType === PrintType.horizontal) {
            const printHeight = 700;
            const printWidth = 1200;

            // resize for printing
            this.svg
                .attr('width', printWidth)
                .attr('height', printHeight);
            const printScale = Math.min(1, printWidth / (totalWidthLeft + totalWidthRight), printHeight / totalHeight);
            translateX = totalWidthLeft * printScale;
            translateY = this.margin.top * printScale;
            this.g.attr('transform', 'translate(' + translateX + ', ' + translateY + ') scale(' + printScale + ')');
        } else {
            // resize for printing
            this.svg.attr('width', totalHeight)
                .attr('height', totalWidthLeft + totalWidthRight);
            translateX = totalHeight - this.margin.top;
            translateY = totalWidthLeft;
            this.g.attr('transform', 'translate(' + translateX + ', ' + translateY + ') rotate(90)');
        }

        // change CSS for printing
        d3.selectAll('#genmapper-graph-svg').style('background', 'white');

        window.print();

        // change CSS back after printing
        this.svg
            .attr('width', origWidth)
            .attr('height', origHeight);
        this.g.attr('transform', origTransform);
        d3.selectAll('#genmapper-graph-svg').style('background', null);
    }

    /**
     * @private Data Parsing Methods
     */
    private _deleteAllDescendants(node: any): void {
        let idsToDelete = _.map(node.children, (row) => row.id);
        while (idsToDelete.length > 0) {
            const currentId = idsToDelete.pop();
            const childrenIdsToDelete = _.map(_.filter(this.data, { parentId: currentId }), (row: any) => row.id);
            idsToDelete = idsToDelete.concat(childrenIdsToDelete);
            const nodeToDelete = _.filter(this.data, { id: currentId });
            if (nodeToDelete) { this.data = _.without(this.data, nodeToDelete[0]) as GNode[]; }
        }
    }

    /**
     * @private Map Drawing Methods
     */
    private _createMap(): void {
        const self = this;
        this.zoom = d3.zoom()
            .scaleExtent([0.05, 2])
            .on('zoom', () => {
                d3.select('g').attr('transform', d3.event.transform);
            });

        this.dragBehavior = drag<Element, NodeDatum>()
            .subject(d => d)
            .on('start', function (d: NodeDatum): void { self.onDragStart(d, this); })
            .on('drag', function (d: NodeDatum): void { self.onDragged(d, this); })
            .on('end', function (d: NodeDatum): void { self.onDragEnd(d, this); })

        this.svg = d3.select(this.graphSvg.nativeElement)
            .call(this.zoom)
            .on('dblclick.zoom', null)
            .on('click', (d) => {
                this.unFocusAllNodes();
            });

        this.resize();

        this.g = this.svg
            .append('g')
            .attr('id', 'maingroup');

        this.gLinks = this.g
            .append('g')
            .attr('class', 'group-links');

        this.gLinksText = this.g
            .append('g')
            .attr('class', 'group-links-text');

        this.gNodes = this.g
            .append('g')
            .attr('class', 'group-nodes');

        this.update(this.data);
    }

    private redraw(): void {
        // declares a tree layout and assigns the size
        const tree = d3.tree()
            .nodeSize([
                this.template.svgSettings.nodeWidth,
                this.template.svgSettings.nodeHeight
            ])
            .separation((a, b) => {
                return a.parent === b.parent ? 1 : 1.2;
            });

        const stratifiedData = d3.stratify<GNode>()
            .id(d => d.id)
            .parentId(d => d.parentId)
            (this.data);

        this.nodes = tree(stratifiedData);

        // update the links between the nodes
        const link = this.gLinks.selectAll('.link')
            .data(this.nodes.descendants().slice(1));

        link.exit()
            .remove();

        link.enter()
            .append('path')
            .merge(link)
            .attr('class', 'link')
            .attr('d', (d) => {
                return 'M' + d.x + ',' + d.y +
                    'C' + d.x + ',' + (d.y + (d.parent.y + MapStyles.boxHeight)) / 2 +
                    ' ' + d.parent.x + ',' + (d.y + (d.parent.y + MapStyles.boxHeight)) / 2 +
                    ' ' + d.parent.x + ',' + (d.parent.y + MapStyles.boxHeight);
            });

        // update the link text between the nodes
        const LINK_TEXT_POSITION = 0.3; // 1 -> parent, 0 -> child
        const linkText = this.gLinksText.selectAll('.link-text')
            .data(this.nodes.descendants().slice(1));
        linkText.exit()
            .remove();
        linkText.enter()
            .append('text')
            .merge(linkText)
            .attr('class', (d) => {
                return 'link-text ' + (
                    d.data.active ? ' link-text--active' : ' link-text--inactive');
            })
            .attr('x', (d) => {
                return d.x * (1 - LINK_TEXT_POSITION) + d.parent.x * LINK_TEXT_POSITION;
            })
            .attr('y', (d) => {
                return d.y * (1 - LINK_TEXT_POSITION) + (d.parent.y + MapStyles.boxHeight) * LINK_TEXT_POSITION;
            })
            .classed('new-generation', (d) => d.data.newGeneration)
            .text(d => {
                if (d.data.coach) {
                    return d.data.coach;
                }

                if (d.data.newGeneration) {
                    let parent = d.parent;
                    let depth = 1;

                    while (parent) {
                        if (parent.data.newGeneration) {
                            depth++;
                        }
                        parent = parent.parent;
                    }

                    return 'G' + depth;
                }
            });


        // update nodes
        const node = this.gNodes.selectAll('.node')
            .data(this.nodes.descendants());

        node.exit()
            .remove();

        // NEW ELEMENTS
        const newGroup = node.enter().append('g');

        newGroup.append('title').text(i18next.t('Node_editGroup'));

        newGroup.append('rect')
            .attr('class', 'hidden-rect')
            .attr('width', 36)
            .attr('height', 100)
            .attr('x', (this.template.svgSettings.nodeBounds.width / 2) - 26);

        // append Template SVGS
        this.template.svgs.forEach((svg) => {
            if (svg.type === 'image') {
                svg.attributes.width = svg.attributes.width || this.template.svgSettings.iconSize;
                svg.attributes.height = svg.attributes.height || this.template.svgSettings.iconSize;
            }

            const g = newGroup.append('g');
            g.classed('group-' + svg.id, true);
            g.append('title').text(svg.tooltipi18nValue);
            const element = g.append(svg.type);
            element.classed('node-' + svg.id, true);
            applySVGAttrsAndStyle(svg, element);
        });

        this.template.svgActions.forEach(action => {
            _appendAction(newGroup, this.template, action);
        });


        newGroup.append('g').attr('class', 'node-labels');

        // UPDATE including NEW
        const nodeWithNew = node.merge(newGroup);
        nodeWithNew
            .attr('node-id', d => d.data.id)
            .attr('class', (d) => {
                return 'node' + (d.data.active ? ' node--active' : ' node--inactive');
            })
            .attr('transform', (d) => {
                return 'translate(' + d.x + ',' + d.y + ')';
            })
            .on('click', (d) => {
                d3.event.stopPropagation();
                this.unFocusAllNodes();
                this.focusNodeById(d.data.id);

                if (Device.isDesktop) {
                    this.onEditNodeClick(d);
                }
            });

        this.nodeLabelFields.sort((a, b) => a.nodeSvgLabelOrder - b.nodeSvgLabelOrder);

        nodeWithNew.select('.node-labels')
            .html(d => {
                let line = 1;
                const textHeight = this.template.svgSettings.textHeight;
                const boxHeight = this.template.svgSettings.boxHeight;

                let svg = '';
                this.nodeLabelFields
                    .filter(field => d.data[field.id])
                    .forEach((field, i) => {
                        svg += `<text text-anchor="start" y="${boxHeight + (i + line) * textHeight}">${d.data[field.id]}</text>`;
                    });
                return svg;
            });


        nodeWithNew
            .select('.remove-node-action')
            .on('click', (d) => {
                d3.event.stopPropagation();
                this.onRemoveNodeClick(d);
            });

        nodeWithNew
            .select('.addChildNode')
            .on('click', (d) => {
                d3.event.stopPropagation();
                this.onAddNodeClick(d);
            });

        nodeWithNew
            .select('.editNode')
            .on('click', (d) => {
                d3.event.stopPropagation();
                this.unFocusAllNodes();
                this.focusNodeById(d.data.id);
                this.onEditNodeClick(d);
            });

        // refresh class and attributes in SVG elements without fields
        // // in order to remove any additional classes or settings from inherited fields
        this.template.svgs.forEach((svg) => {
            const element = nodeWithNew.select('.node-' + svg.id);
            applySVGAttrsAndStyle(svg, element);

            if (svg.state) {
                svg.state.forEach(state => {
                    if (state.setText) {
                        element.text((d) => {
                            if (d.data[state.fieldRef] || d.data[state.fieldRef] === 0) {
                                if (Array.isArray(d.data[state.fieldRef])) {
                                    return d.data[state.fieldRef].join('');
                                }

                                return d.data[state.fieldRef];
                            }
                        });
                    }

                    if (state.setIcon) {
                        element.attr('xlink:href', (d) => {
                            const fieldValue = d.data[state.fieldRef];
                            const stateValue = state.fieldRefValues.find(v => v.iconRefValue && v.value === fieldValue);

                            if (stateValue) {
                                return stateValue.iconRefValue;
                            }

                            return svg.attributes['xlink:href'];
                        });
                    }

                    if (state.attr) {
                        const defaultAttrValue = svg.attributes ? svg.attributes[state.attr] : '';
                        element.attr(state.attr, (d) => {
                            const len = state.fieldRefValues.length;
                            for (let i = 0; i < len; i++) {
                                if (d.data[state.fieldRef] === state.fieldRefValues[i].value) {
                                    return state.fieldRefValues[i].attrValue;
                                }
                            }
                            return defaultAttrValue;
                        });
                    }

                    if (state.style) {
                        const defaultStyleValue = svg.style ? svg.style[state.style] : '';
                        element.style(state.style, (d) => {
                            const len = state.fieldRefValues.length;
                            for (let i = 0; i < len; i++) {
                                if (state.fieldRefValues[i].hasOwnProperty('styleValue')) {
                                    if (d.data[state.fieldRef] === state.fieldRefValues[i].value) {
                                        return state.fieldRefValues[i].styleValue;
                                    }
                                }
                            }
                            return defaultStyleValue;
                        });
                    }
                });
            }
        });

        // const _template = this.template;
        // nodeWithNew.each(function (d) {
        //     const el = d3.select(this);
        //     _template.svgElementIcons.forEach(icon => {
        //         if (!icon.state) { return; }
        //         icon.state.forEach(state => {
        //             if (d.data[state.fieldRef] === state.fieldValue) {
        //                 applySVGAttrsAndStyle(state, el.select('.node-' + icon.id));
        //             }
        //         });
        //     });
        // });

        node.exit()
            .remove();

        if (this.onChange) {
            this.onChange(this.data);
        }
    }

    private _isDraggingDisabled(draggingNode: NodeDatum): boolean {
        // Ignore Drag if RootNode
        if (draggingNode.data.isRoot) {
            return true;
        }

        // Ignore Drag if only child
        if (draggingNode.parent.children.length < 2) {
            return true;
        }

        return false;
    }

    private unFocusAllNodes(): void {
        this.svg.selectAll('.node').classed('is-focused', false);
    }

    private focusNodeById(id: string): void {
        this.svg.select(`.node[node-id="${id}"]`).classed('is-focused', true);
    }
}


function _appendAction(group: any, template: GMTemplate, action: GMSvgAction): void {
    const width = action.attributes.width || 28;
    const height = action.attributes.height || 40;

    const svg = group.append('g')
        .attr('class', action.id)
        .attr('cursor', 'pointer')
        .classed('node-action', true)
        .classed(action.control, true)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

    // .attr('y', template.svgSettings.nodeActions.y + 50)
    // .attr('x', template.svgSettings.nodeActions.x)
    // .attr('height', height)
    // .attr('width', width)

    action.attributes = action.attributes || {};
    action.attributes.width = action.attributes.width || width;
    action.attributes.height = action.attributes.height || height;

    applySVGAttrsAndStyle(action, svg);

    svg.html(`
            <rect x="2px" y="2px" rx="7" height="${height - 4}" width="${width - 4}"></rect>
            <title>${i18next.t('Node_hoverAddChildGroup')}</title>
            </rect>
            <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle">
                <tspan class="material-icons">${action.iconName}</tspan>
            </text>
        `);
}

function _parseTransform(a: any): any {
    const b = {};
    let i;

    // tslint:disable-next-line:forin
    for (i in a = a.match(/(\w+\((-?\d+.?\d*e?-?\d*,?)+\))+/g)) {
        const c = a[i].match(/[\w.-]+/g);
        b[c.shift()] = c;
    }

    return b;
}

function findNewIdFromArray(arr: any[]): any {
    // copy and sort
    arr = arr.slice().sort((a, b) => a - b);
    return parseFloat(arr[arr.length - 1]) + 1 + '';
}


function applySVGAttrsAndStyle(svg: GMSvg, element: any): void {
    if (svg.class) {
        element.attr('class', svg.class);
    }

    if (svg.attributes) {
        applyAttributesToSvg(svg.attributes, element);
    }

    if (svg.style) {
        Object.keys(svg.style).forEach((styleKey) => {
            element.style(styleKey, svg.style[styleKey]);
        });
    }
}

function applyAttributesToSvg(attributes: any, element: any) {
    Object.keys(attributes).forEach((attribute) => {
        if (attribute === 'icon') {
            attribute = 'xlink:href';
        }

        element.attr(attribute, attributes[attribute]);
    });
}
