import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import i18next from 'i18next';
import * as i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';
import { GMField } from './gen-mapper.interface';
import { Observable, ReplaySubject } from 'rxjs';

export const MapStyles = {
    boxHeight: 80,
    testHeight: 14,
    textMargin: 6
};

export class GenMap {
    public initialCsv: string;
    public csvHeader: string;
    public data: any;
    public language: any;

    public zoom: any;
    public svg: any;
    public g: any;
    public nodes: any;
    public gNodes: any;
    public gLinks: any;
    public gLinksText: any;

    public margin = { top: 110, right: 30, bottom: 50, left: 30 };

    public onChange = (v: string) => { };

    constructor(
        private graphSvg: ElementRef,
        private template: any,
        private content?: string,
    ) {
    }

    public init(): void {
        i18next
            .use(i18nextBrowserLanguageDetector)
            .init({
                fallbackLng: 'en',
                resources: _.defaultsDeep(this.template.translations)
            });

        if (this.template.translations[i18next.language]) {
            this.language = i18next.language;
        }

        this._createMap();
    }

    public update(content: string): void {
        this.content = content;
        this.data = this._parseCsvData(this.content);
        this.nodes = null;

        this.originalPosition();
        this.redraw();
    }

    public onZoomInClick(): void {
        this.zoom.scaleBy(this.svg, 1.2);
    }

    public onZoomOutClick(): void {
        this.zoom.scaleBy(this.svg, 1 / 1.2);
    }

    public nodeClick = (node): void => { };
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
        const newNodeData = {};
        this.template.fields.forEach((field) => {
            newNodeData[field.header] = this._getInitialValue(field);
        });
        newNodeData['id'] = this.findNewId();
        newNodeData['parentId'] = node.data.id;
        this.data.push(newNodeData);
        this.redraw();
    }

    public removeNode(node: any): void {
        if (!node.parent) {
            return;
        }

        this._deleteAllDescendants(node);
        const nodeToDelete = _.filter(this.data, { id: node.data.id });
        if (nodeToDelete) {
            this.data = _.without(this.data, nodeToDelete[0]);
            this.redraw();
        }
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
    private _parseCsvData(csvData: string): any {
        return d3.csvParse(csvData, (d) => {
            const parsedId = parseFloat(d.id);
            if (parsedId < 0 || isNaN(parsedId)) { throw new Error('Group id must be integer >= 0.'); }
            const parsedLine = {};
            parsedLine['id'] = parsedId;
            parsedLine['parentId'] = d.parentId !== '' ? parseFloat(d.parentId) : '';
            this.template.fields.forEach((field) => {
                if (field.type === 'checkbox') {
                    const fieldValue = d[field.header].toUpperCase();
                    parsedLine[field.header] = !!['TRUE', '1'].includes(fieldValue);
                } else if (field.type) {
                    parsedLine[field.header] = d[field.header];
                }
            });
            return parsedLine;
        });
    }

    private _deleteAllDescendants(node: any): void {
        let idsToDelete = _.map(node.children, (row) => parseFloat(row.id));
        while (idsToDelete.length > 0) {
            const currentId = idsToDelete.pop();
            const childrenIdsToDelete = _.map(_.filter(this.data, { parentId: currentId }), (row) => row.id);
            idsToDelete = idsToDelete.concat(childrenIdsToDelete);
            const nodeToDelete = _.filter(this.data, { id: currentId });
            if (nodeToDelete) { this.data = _.without(this.data, nodeToDelete[0]); }
        }
    }

    private _getInitialValue(field: any): any {
        if (field.initialTranslationCode) {
            return i18next.t('template.' + field.initialTranslationCode);
        } else {
            return field.initial;
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

        this.csvHeader = this.template.fields.map(field => field.header).join(',') + '\n';

        this.initialCsv = this.csvHeader + this.template.fields.map(field => this._getInitialValue(field)).join(',');

        if (this.content) {
            this.data = this._parseCsvData(this.content);
        } else {
            this.data = this._parseCsvData(this.initialCsv);
        }

        this.nodes = null;

        this.originalPosition();
        this.redraw();
    }

    private _getOutputCsv(): string {
        return this.csvHeader + d3.csvFormatRows(this.data.map((d, i) => {
            const output = [];
            this.template.fields.forEach((field) => {
                if (field.type === 'checkbox') {
                    output.push(d[field.header] ? '1' : '0');
                } else {
                    output.push(d[field.header]);
                }
            });
            return output;
        }));
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
                this.template.settings.nodeSize.width,
                this.template.settings.nodeSize.height
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
            .text((d) => d.data.coach);

        // update nodes
        const node = this.gNodes.selectAll('.node')
            .data(this.nodes.descendants());

        node.exit()
            .remove();

        // NEW ELEMENTS
        const newGroup = node.enter()
            .append('g');

        newGroup.append('title').text(i18next.t('editGroup.editGroup'));

        _appendRemoveButton(newGroup);
        _appendAddButton(newGroup);

        // append SVG elements without fields
        Object.keys(this.template.svg).forEach((svgElement) => {
            const svgElementValue = this.template.svg[svgElement];
            const element = newGroup.append(svgElementValue['type']);
            element.attr('class', 'node-' + svgElement);
        });

        // append SVG elements related to fields
        this.template.fields.forEach((field) => {
            if (field.svg) {
                const element = newGroup.append(field.svg['type']);
                element.attr('class', 'node-' + field.header);

                Object.keys(field.svg.attributes).forEach((attribute) => {
                    element.attr(attribute, field.svg.attributes[attribute]);
                });

                if (field.svg.style) {
                    Object.keys(field.svg.style).forEach((styleKey) => {
                        element.style(styleKey, field.svg.style[styleKey]);
                    });
                }
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
            this.onChange(this._getOutputCsv());
        }
    }

    private _updateSvgForFields(field: any, element: any): void {
        element.text((d) => {
            // InstallTrigger???
            // add spaces between each character for Firefox
            // if (field.header === 'threeThirds' && typeof InstallTrigger !== 'undefined') {
            //     return d.data[field.header].replace(/(.)/g, '$1 ');
            // } else {
            //     return d.data[field.header];
            // }
            return d.data[field.header];
        });
        if (field.svg.type === 'image') {
            element.style('display', (s) => {
                return s.data[field.header] ? 'block' : 'none';
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

function _appendRemoveButton(group: any): void {
    group.append('g')
        .attr('class', 'removeNode')
        .append('svg')
        .html(`
            <rect x="40" y="0" rx="7" width="25" height="40">
            <title>${i18next.t('editGroup.hoverDeleteGroupAndSubtree')}</title>
            </rect>
            <line x1="46" y1="13.5" x2="59" y2="26.5" stroke="white" stroke-width="3"></line>
            <line x1="59" y1="13.5" x2="46" y2="26.5" stroke="white" stroke-width="3"></line>
        `);
}

function _appendAddButton(group: any): void {
    group.append('g')
        .attr('class', 'addNode')
        .append('svg')
        .html(`
            <rect x="40" y="40" rx="7" width="25" height="40">
            <title>${i18next.t('editGroup.hoverAddChildGroup')}</title>
            </rect>
            <line x1="45" y1="60" x2="60" y2="60" stroke="white" stroke-width="3"></line>
            <line x1="52.5" y1="52.5" x2="52.5" y2="67.5" stroke="white" stroke-width="3"></line>
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
