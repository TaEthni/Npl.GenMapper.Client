import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import i18next from 'i18next';
import * as _ from 'lodash';

import { GNode, PrintType } from './gen-mapper.interface';
import { TemplateUtils } from './template-utils';
import { HierarchyNode, zoomTransform, zoomIdentity } from 'd3';
import { cloneDeep } from 'lodash';
import { Device } from '@core/platform';
import { GMStreamAttribute, GMTemplate, GMField } from '@templates';

export const MapStyles = {
    boxHeight: 80,
    textHeight: 14,
    textMargin: 6
};

const isNumberReg = /\d/;

export class GenMap {
    public initialCsv: string;
    public csvHeader: string;
    public language: any;

    public zoom: any;
    public svg: any;
    public g: any;
    public nodes: any;
    public gNodes: any;
    public gLinks: any;
    public gLinksText: any;
    public nodeLabelAttributes: GMStreamAttribute[];

    public margin = { top: 110, right: 30, bottom: 50, left: 30 };

    public onChange = (v: GNode[]) => { };
    public onCopyNode = (v: GNode[]) => { };
    public onPasteNode = (d: HierarchyNode<any>) => { };

    constructor(
        private graphSvg: ElementRef,
        private template: GMTemplate,
        public attributes: GMStreamAttribute[],
        public data?: GNode[],
    ) {
        if (this.attributes) {
            this.nodeLabelAttributes = this.attributes.filter(a => a.isLabel);
        }
    }

    public init(): void {
        if (this.template.translations[i18next.language]) {
            this.language = i18next.language;
        } else {
            this.language = 'en';
        }

        this._createMap();
    }

    public update(content: GNode[], attributes: GMStreamAttribute[], originalPosition: boolean = true): void {
        this.data = content;
        this.nodes = null;
        this.attributes = attributes;
        this.nodeLabelAttributes = attributes.filter(a => a.isLabel);

        if (originalPosition) {
            this.originalPosition();
        }

        this.redraw();
    }

    public redrawData(data: GNode[], attributes: GMStreamAttribute[]): void {
        this.data = data;
        this.attributes = attributes;
        this.nodeLabelAttributes = attributes.filter(a => a.isLabel);
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
            newNodeData[field.header] = TemplateUtils.getInitialTemplateValue(field, this.template);
        });

        this.attributes.forEach(attr => {
            if (!this.template.fieldsByKey[attr.propertyName]) {
                newNodeData[attr.propertyName] = '';
            }
        });

        newNodeData['id'] = this.findNewId();
        newNodeData['parentId'] = node.data.id;
        this.data.push(newNodeData);
        this.redraw();
        this.focusNodeById(newNodeData.id);
        this.centerNodeById(newNodeData.id);
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
        const parsedCsv = TemplateUtils.parseCsvData(csvString, this.template.format);
        this.overwriteNode(d, parsedCsv);
    }

    public overwriteNode(d: any, data: GNode[]): void {
        // replace node by root of imported
        const nodeToDelete: any = _.filter(this.data, { id: d.data.id })[0];
        const rowRootOfImported: any = _.filter(data, { parentId: '' })[0];
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

    public printMap(printType: PrintType): void {
        const boxHeight = this.template.settings.boxHeight;

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

    private findNewId(): string {
        const ids = _.map(this.data, (row) => row.id);
        return findNewIdFromArray(ids);
    }

    /**
     * @private Map Drawing Methods
     */

    private _createMap(): void {
        this.zoom = d3.zoom()
            .scaleExtent([0.05, 2])
            .on('zoom', () => {
                d3.select('g').attr('transform', d3.event.transform);
            });

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

        this.update(this.data, this.attributes);
    }

    private redraw(): void {
        // declares a tree layout and assigns the size
        const tree = d3.tree()
            .nodeSize([
                this.template.settings.nodeSize.width + 5,
                this.template.settings.nodeSize.height + 12
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
        const newGroup = node.enter()
            .append('g');

        newGroup.append('title').text(i18next.t('Node_editGroup'));

        newGroup.append('rect')
            .attr('class', 'hidden-rect')
            .attr('width', 36)
            .attr('height', 100)
            .attr('x', (this.template.settings.nodeSize.width / 2) - 26);

        // append SVG elements without fields
        Object.keys(this.template.svg).forEach((svgElement) => {
            const svgElementValue = this.template.svg[svgElement];
            const element = newGroup.append(svgElementValue['type']);
            element.attr('class', 'node-' + svgElement);
            applySVGAttrsAndStyle(svgElementValue, element);
        });

        // _appendRemoveButton(newGroup, this.template);
        _appendAddButton(newGroup, this.template);
        _appendEditButton(newGroup, this.template);

        // append SVG elements related to fields
        this.template.fields.forEach((field) => {
            if (field.svg) {
                const g = newGroup.append('g');
                g.append('title').text(i18next.t(this.template.format + '.' + field.header));
                const element = g.append(field.svg['type']);
                element.attr('class', 'node-' + field.header);
                applySVGAttrsAndStyle(field.svg, element);
            }
        });

        newGroup.append('g')
            .attr('class', 'node-labels');

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

        this.nodeLabelAttributes.sort((a, b) => a.order - b.order);
        nodeWithNew.select('.node-labels')
            .html(d => {
                let line = 1;
                const textHeight = this.template.settings.textHeight;
                const boxHeight = this.template.settings.boxHeight;
                if (d.data.name) {
                    line++;
                }

                let svg = '';
                this.nodeLabelAttributes
                    .filter(attr => d.data[attr.propertyName])
                    .forEach((attr, i) => {
                        svg += `<text text-anchor="start" y="${boxHeight + (i + line) * textHeight}">${d.data[attr.propertyName]}</text>`;
                    });
                return svg;
            });

        nodeWithNew
            .select('.removeNode')
            .on('click', (d) => {
                d3.event.stopPropagation();
                this.onRemoveNodeClick(d);
            });

        nodeWithNew
            .select('.addNode')
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
        // in order to remove any additional classes or settings from inherited fields
        Object.keys(this.template.svg).forEach((svgElement) => {
            const svgElementValue = this.template.svg[svgElement];
            const element = nodeWithNew.select('.node-' + svgElement);
            applySVGAttrsAndStyle(svgElementValue, element);
        });

        // update node elements which have SVG in template
        this.template.fields.forEach((field) => {
            if (field.svg) {
                const element = nodeWithNew.select('.node-' + field.header);
                this._updateSvgForFields(field, element);
            }
            if (field.inheritsFrom) {
                const element = nodeWithNew.select('.node-' + field.inheritsFrom);
                this._updateFieldWithInherit(field, element);
            }
        });

        node.exit()
            .remove();

        if (this.onChange) {
            this.onChange(this.data);
        }
    }

    private _updateSvgForFields(field: any, element: any): void {
        applySVGAttrsAndStyle(field.svg, element);
        element.text((d) => {
            // InstallTrigger???
            // add spaces between each character for Firefox
            // if (field.header === 'threeThirds' && typeof InstallTrigger !== 'undefined') {
            //     return d.data[field.header].replace(/(.)/g, '$1 ');
            // } else {
            //     return d.data[field.header];
            // }

            // Only for old data when threeThirds was a string.
            if (field.header === 'threeThirds' && Array.isArray(d.data[field.header])) {
                return d.data[field.header].join('');
            }

            return d.data[field.header];
        });

        if (field.svg.type === 'image') {
            element.style('opacity', (s) => {
                return s.data[field.header] ? '1' : '0.2';
            });
        }
    }

    private _updateFieldWithInherit(field: any, element: any): void {
        if (!element.empty()) {
            if (field.type === 'checkbox') { this._updateCheckboxField(field, element); }
            if (field.type === 'radio') { this._updateRadioField(field, element); }
        }
    }

    private _updateCheckboxField(field: any, element: any): void {
        // add class to the element which the field inherits from
        if (field.class) {

            element.classed(field.class.checkedTrue, (d) => d.data[field.header]);
            element.classed(field.class.checkedFalse, (d) => !d.data[field.header]);
        }
        if (typeof field.attributes !== 'undefined' &&
            typeof field.attributes.rx !== 'undefined') {
            element.attr('rx', function (d: any): any {
                const checked = d.data[field.header];
                const rxObj = field.attributes.rx;
                const rx = checked ? rxObj.checkedTrue : rxObj.checkedFalse;
                return String(rx);
            });
        }
    }

    private _updateRadioField(field: any, element: any): void {
        // add class to the element which the field inherits from
        field.values.forEach(v => {
            if (v.class) {
                element.classed(v.class, (d) => d.data[field.header] === v.header);
            }
        });

        element.attr('rx', function (d: any): any {
            const fieldValue = _getFieldValueForRadioType(field, d);
            if (typeof fieldValue.attributes !== 'undefined' &&
                typeof fieldValue.attributes.rx !== 'undefined') {
                return String(fieldValue.attributes.rx);
            } else {
                return this.rx.baseVal.valueAsString;
            }
        });
    }

    private unFocusAllNodes(): void {
        this.svg.selectAll('.node').classed('is-focused', false);
    }

    private focusNodeById(id: string): void {
        this.svg.select(`.node[node-id="${id}"]`).classed('is-focused', true);
    }
}

function _appendEditButton(group: any, template: GMTemplate): void {
    group.append('g')
        .attr('class', 'editNode')
        .attr('cursor', 'pointer')
        .append('svg')
        .attr('y', template.settings.nodeActions.y + 10)
        .attr('x', template.settings.nodeActions.x)
        .html(`
            <rect x="0" y="0" rx="7" width="32" height="40">
            <title>${i18next.t('Node_copyNodeButton')}</title>
            </rect>
            <path style="transform: translate(4px, 8px)"
                fill="white"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02
            0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        `);

    // <text x="16" y="28" text-anchor="middle" fill="white" stroke="unset">
    //     <tspan class="material-icons" font-family="Material Icons" font-size="24px" style="font-size: 24px">
    //         edit
    //     </tspan>
    // </text>
}

function _appendAddButton(group: any, template: GMTemplate): void {
    group.append('g')
        .attr('class', 'addNode')
        .attr('cursor', 'pointer')
        .append('svg')
        .attr('y', template.settings.nodeActions.y + 50)
        .attr('x', template.settings.nodeActions.x)
        .html(`
            <rect x="0" y="0" rx="7" width="32" height="40">
            <title>${i18next.t('Node_hoverAddChildGroup')}</title>
            </rect>
            <line x1="5" y1="20" x2="27" y2="20" stroke="white" stroke-width="3"></line>
            <line x1="16" y1="8" x2="16" y2="32" stroke="white" stroke-width="3"></line>
        `);
    // <text x="16" y="32px" text-anchor="middle" fill="white" stroke="unset">
    //     <tspan class="material-icons" font-family="Material Icons" font-size="32px" style="font-size: 32px">
    //         add
    //     </tspan>
    // </text>
}

function _appendRemoveButton(group: any, template: GMTemplate): void {
    group.filter(n => !n.data.isRoot).append('g')
        .attr('class', 'removeNode')
        .attr('cursor', 'pointer')
        .append('svg')
        .attr('y', template.settings.nodeActions.y + 64)
        .attr('x', template.settings.nodeActions.x)
        .html(`
            <rect x="0" y="0" rx="7" width="32" height="32">
            <title>${i18next.t('Node_hoverDeleteGroupAndSubtree')}</title>
            </rect>
            <path style="transform: translate(4px, 4px)"
                fill="white"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            `);
    // <text x="16" y="28px" text-anchor="middle" fill="white" stroke="unset">
    //     <tspan class="material-icons" font-family="Material Icons" font-size="24px" style="font-size: 24px">
    //         delete
    //     </tspan>
    // </text>
    // <line x1="6" y1="13.5" x2="19" y2="26.5" stroke="white" stroke-width="3"></line>
    // <line x1="19" y1="13.5" x2="6" y2="26.5" stroke="white" stroke-width="3"></line>
}

function _appendCopyButton(group: any, template: GMTemplate): void {
    group.append('g')
        .attr('class', 'copyNode')
        .attr('cursor', 'pointer')
        .style('transform', n => n.data.isRoot ? 'translateY(-20px)' : '')
        .append('svg')
        .attr('y', template.settings.nodeActions.y + 50)
        .attr('x', template.settings.nodeActions.x)
        .html(`
            <rect x="0" y="0" rx="7" width="25" height="25">
            <title>${i18next.t('Node_copyNodeButton')}</title>
            </rect>
            <line x1="4" y1="4" x2="16" y2="4" stroke="white" stroke-width="2"></line>
            <line x1="4" y1="4" x2="4" y2="16" stroke="white" stroke-width="2"></line>
            <rect x="8" y="8" height="12" width="12" stroke-width="2" stroke="#fff"></rect>
        `);
}

function _appendPasteButton(group: any, template: GMTemplate): void {
    group.append('g')
        .attr('class', 'pasteNode')
        .attr('cursor', 'pointer')
        .style('transform', n => n.data.isRoot ? 'translateY(-20px)' : '')
        .append('svg')
        .attr('y', template.settings.nodeActions.y + 75)
        .attr('x', template.settings.nodeActions.x)
        .html(`
            <rect x="0" y="0" rx="7" width="25" height="25">
                <title>${i18next.t('Node_pasteNodeButton')}</title>
            </rect>
            <line x1="4" y1="4" x2="16" y2="4" stroke="white" stroke-width="2"></line>
            <line x1="4" y1="4" x2="4" y2="16" stroke="white" stroke-width="2"></line>
            <rect x="8" y="8" height="12" width="12" stroke-width="2" stroke="#fff"></rect>
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

function _getFieldValueForRadioType(field: any, d: any): any {
    let fieldValue = _.filter(field.values, { header: d.data[field.header] })[0];
    if (typeof fieldValue === 'undefined') {
        fieldValue = _.filter(field.values, { header: field.initial })[0];
    }
    return fieldValue;
}

function findNewIdFromArray(arr: any[]): any {
    // copy and sort
    arr = arr.slice().sort((a, b) => a - b);
    return parseFloat(arr[arr.length - 1]) + 1 + '';
}


function applySVGAttrsAndStyle(svg: { attributes?: {}, style?: {} }, element: any): void {
    if (svg.attributes) {
        Object.keys(svg.attributes).forEach((attribute) => {
            element.attr(attribute, svg.attributes[attribute]);
        });
    }

    if (svg.style) {
        Object.keys(svg.style).forEach((styleKey) => {
            element.style(styleKey, svg.style[styleKey]);
        });
    }
}
