import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import i18next from 'i18next';
import * as _ from 'lodash';

import { GMField, GMTemplate, GNode } from './gen-mapper.interface';
import { TemplateUtils } from './template-utils';
import { HierarchyNode } from 'd3';

export const MapStyles = {
    boxHeight: 80,
    testHeight: 14,
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

    public margin = { top: 110, right: 30, bottom: 50, left: 30 };

    public onChange = (v: GNode[]) => { };
    public onCopyNode = (v: GNode[]) => { };
    public onPasteNode = (d: HierarchyNode<any>) => { };

    constructor(
        private graphSvg: ElementRef,
        private template: GMTemplate,
        public data?: GNode[],
    ) { }

    public init(): void {
        if (this.template.translations[i18next.language]) {
            this.language = i18next.language;
        } else {
            this.language = 'en';
        }

        this._createMap();
    }

    public update(content: GNode[]): void {
        this.data = content;
        this.nodes = null;
        this.patchNodes(this.data);

        this.originalPosition();
        this.redraw();
    }

    public patchNodes(data: any[]): void {
        data.forEach(item => {

            item.isRoot = !item.parentId && item.parentId !== 0;

            // This is for old data.
            if (item.hasOwnProperty('threeThirds')) {
                if (typeof item.threeThirds === 'string') {
                    item.threeThirds = item.threeThirds.replace(/\W/, '');
                    item.threeThirds = item.threeThirds.split('');
                }

                const filtered = item.threeThirds.filter((key: any) => isNumberReg.test(key));
                const value: any = [];

                // dedupe old data
                filtered.forEach((a: any) => {
                    if (!value.includes(a)) {
                        value.push(a);
                    }
                });

                item.threeThirds = value;
            }
        });
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

    public addNodeClick = (node: any): void => { this.addNode(node); };
    private onAddNodeClick(node: Node): void {
        this.addNodeClick(node);
    }

    public removeNodeClick = (node: any) => { this.removeNode(node); };
    private onRemoveNodeClick(node: Node): void {
        this.removeNodeClick(node);
    }

    public addNode(node: any): void {
        const newNodeData: any = {};
        this.template.fields.forEach((field: GMField) => {
            newNodeData[field.header] = TemplateUtils.getInitialTemplateValue(field, this.template);
        });
        newNodeData['id'] = this.findNewId();
        newNodeData['parentId'] = node.data.id;
        this.data.push(newNodeData);
        this.redraw();
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

    /**
     * @public Map manipulation methods
     */
    public originalPosition(): void {
        this.zoom.scaleTo(this.svg, 1);
        const origX = this.margin.left + (this.graphSvg.nativeElement.clientWidth / 2);
        const origY = this.margin.top;
        const parsedTransform = _parseTransform(this.g.attr('transform'));
        this.zoom.translateBy(this.svg, origX - parsedTransform.translate[0], origY - parsedTransform.translate[1]);
    }

    /**
     * @private Data Parsing Methods
     */
    private _deleteAllDescendants(node: any): void {
        let idsToDelete = _.map(node.children, (row) => parseFloat(row.id));
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
            .scaleExtent([0.15, 2])
            .on('zoom', () => {
                d3.select('g').attr('transform', d3.event.transform);
            });

        this._setSvgHeight();

        this.svg = d3.select(this.graphSvg.nativeElement)
            .call(this.zoom)
            .on('dblclick.zoom', null);

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

    private _setSvgHeight(): void {
        const windowHeight = document.documentElement.clientHeight;
        const leftMenuHeight = document.getElementById('left-menu').clientHeight;
        const height = Math.max(windowHeight, leftMenuHeight + 10);
        d3.select('#genmapper-graph-svg').attr('height', height);
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

        const stratifiedData = d3.stratify()(this.data);
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
            .text(d => {
                if (d.data.coach) {
                    return d.data.coach;
                }
                if (d.data.generation) {
                    return 'G' + d.data.generation;
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

        newGroup.append('title').text(i18next.t('editGroup.editGroup'));

        newGroup.append('rect')
            .attr('class', 'hidden-rect')
            .attr('width', 28)
            .attr('height', 100)
            .attr('x', (this.template.settings.nodeSize.width / 2) - 26);

        _appendRemoveButton(newGroup, this.template);
        _appendAddButton(newGroup, this.template);
        // _appendCopyButton(newGroup, this.template);

        // append SVG elements without fields
        Object.keys(this.template.svg).forEach((svgElement) => {
            const svgElementValue = this.template.svg[svgElement];
            const element = newGroup.append(svgElementValue['type']);
            element.attr('class', 'node-' + svgElement);
        });

        // append SVG elements related to fields
        this.template.fields.forEach((field) => {
            if (field.svg) {
                const g = newGroup.append('g');
                g.append('title').text(i18next.t(this.template.format + '.' + field.header));
                const element = g.append(field.svg['type']);
                element.attr('class', 'node-' + field.header);
                applySVGAttrsAndStyle(field, element);
            }
        });

        // UPDATE including NEW
        const nodeWithNew = node.merge(newGroup);

        nodeWithNew
            .attr('class', (d) => {
                return 'node' + (d.data.active ? ' node--active' : ' node--inactive');
            })
            .attr('transform', (d) => {
                return 'translate(' + d.x + ',' + d.y + ')';
            })
            .on('click', (d) => {
                this.onNodeClick(d);
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

        // nodeWithNew
        //     .select('.copyNode')
        //     .on('click', (d) => {
        //         d3.event.stopPropagation();
        //         const nodes = d.descendants().map(n => n.data);
        //         const root = nodes.find(n => n.id === d.data.id);
        //         root.parentId = '';
        //         this.onCopyNode(nodes);
        //     });

        // refresh class and attributes in SVG elements without fields
        // in order to remove any additional classes or settings from inherited fields
        Object.keys(this.template.svg).forEach((svgElement) => {
            const svgElementValue = this.template.svg[svgElement];
            const element = nodeWithNew.select('.node-' + svgElement)
                .attr('class', 'node-' + svgElement);
            Object.keys(svgElementValue.attributes).forEach((attribute) => {
                element.attr(attribute, svgElementValue.attributes[attribute]);
            });
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

        if (this.onChange) {
            this.onChange(this.data);
        }
    }

    private _updateSvgForFields(field: any, element: any): void {
        applySVGAttrsAndStyle(field, element);
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
            element.attr('class', function (d: any): any {
                const checked = d.data[field.header];
                const class_ = checked ? field.class.checkedTrue : field.class.checkedFalse;
                return this.classList.value + ' ' + class_;
            });
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
        element.attr('class', function (d: any): any {
            const fieldValue = _getFieldValueForRadioType(field, d);
            if (fieldValue.class) {
                return this.classList.value + ' ' + fieldValue.class;
            } else {
                return this.classList.value;
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
}

function _appendRemoveButton(group: any, template: GMTemplate): void {
    group.filter(n => !n.data.isRoot).append('g')
        .attr('class', 'removeNode')
        .attr('cursor', 'pointer')
        .append('svg')
        .attr('y', template.settings.nodeActions.y)
        .attr('x', template.settings.nodeActions.x)
        .html(`
            <rect x="0" y="0" rx="7" width="25" height="40">
            <title>${i18next.t('editGroup.hoverDeleteGroupAndSubtree')}</title>
            </rect>
            <line x1="6" y1="13.5" x2="19" y2="26.5" stroke="white" stroke-width="3"></line>
            <line x1="19" y1="13.5" x2="6" y2="26.5" stroke="white" stroke-width="3"></line>
        `);
}

function _appendAddButton(group: any, template: GMTemplate): void {
    group.append('g')
        .attr('class', 'addNode')
        .attr('cursor', 'pointer')
        .style('transform', n => n.data.isRoot ? 'translateY(-20px)' : '')
        .append('svg')
        .attr('y', template.settings.nodeActions.y + 40)
        .attr('x', template.settings.nodeActions.x)
        .html(`
            <rect x="0" y="0" rx="7" width="25" height="40">
            <title>${i18next.t('editGroup.hoverAddChildGroup')}</title>
            </rect>
            <line x1="5" y1="20" x2="20" y2="20" stroke="white" stroke-width="3"></line>
            <line x1="12.5" y1="12.5" x2="12.5" y2="27.5" stroke="white" stroke-width="3"></line>
        `);
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
            <title>${i18next.t('editGroup.hoverCopyNode')}</title>
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
    let tmp = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 0) { // ids must be >= 0
            if (arr[i] === tmp) {
                tmp += 1;
            } else {
                break;
            }
        }
    }
    return tmp;
}


function applySVGAttrsAndStyle(field: GMField, element: any): void {
    if (field.svg.attributes) {
        Object.keys(field.svg.attributes).forEach((attribute) => {
            element.attr(attribute, field.svg.attributes[attribute]);
        });
    }

    if (field.svg.style) {
        Object.keys(field.svg.style).forEach((styleKey) => {
            element.style(styleKey, field.svg.style[styleKey]);
        });
    }
}
