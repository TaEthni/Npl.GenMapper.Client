import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import i18next from 'i18next';
import * as i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';
import { GMTemplate, GMGraphConfig, GMField } from '../gen-mapper.interface';

const boxHeight = 80;
const textHeight = 14;
const textMargin = 6;

export class GenMapperGraph {
    public appVersion: string;
    public language = 'en';
    public margin = { top: 50, right: 30, bottom: 50, left: 30 };
    public projectName: string;

    public zoom;
    public svg;
    public g = null;
    public gLinks = null;
    public gLinksText = null;
    public gNodes = null;

    public csvHeader: string;
    public initialCsv: string;
    public data;
    public nodes;
    public hasUnsavedChanges: boolean;

    public alertElement: HTMLElement;
    public editGroupElement;
    public editParentElement;

    public editFieldElements; // ????

    public introVisibility: boolean;

    constructor(
        public template: GMTemplate,
        public graphSvg: ElementRef,
        public config: GMGraphConfig = {}
    ) {

        this.config.outerHeaderHeight = this.config.outerHeaderHeight || 0;

        i18next.use(i18nextBrowserLanguageDetector)
            .init({
                fallbackLng: 'en',
                resources: _.defaultsDeep(this.template.translations)
            });

        if (this.template.translations[i18next.language]) {
            this.language = i18next.language;
        }

        this.projectName = i18next.t('menu.defaultProjectName');

        this.updateDOMafterLangSwitch();

        this.zoom = d3.zoom()
            .scaleExtent([0.15, 2])
            .on('zoom', () => {
                d3.select('g').attr('transform', d3.event.transform);
            });

        this._setSvgHeight();

        this.svg = d3.select(this.graphSvg.nativeElement)
            .call(this.zoom)
            .on('dblclick.zoom', null);

        this.g = this.svg.append('g')
            .attr('id', 'maingroup')

        this.gLinks = this.g.append('g')
            .attr('class', 'group-links');
        this.gLinksText = this.g.append('g')
            .attr('class', 'group-links-text')
        this.gNodes = this.g.append('g')
            .attr('class', 'group-nodes')

        this.csvHeader = this.template.fields.map(field => field.header).join(',') + '\n';
        this.initialCsv = this.csvHeader + this.template.fields.map(field => this._getInitialValue(field)).join(',');
        this.data = this._parseCsvData(this.initialCsv);
        this.nodes = null;

        this.origPosition();
        this.redraw(this.template);

        this.alertElement = document.getElementById('alert-message')
        this.editGroupElement = document.getElementById('edit-group')
        // if there are unsaved changes give hint to user before he tries to close the browser window
        this.hasUnsavedChanges = false;

        this._setKeyboardShorcuts();

        document.getElementsByTagName('body')[0].onresize = this._setSvgHeight;

        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.returnValue = true; // Gecko, Trident, Chrome 34+
                return true; // Gecko, WebKit, Chrome <34
            }
            return false;
        });
        this.alertForNonSupportedBrowsers();
    }


    public _setEditFieldElements(): void {
        this.editFieldElements = {}
        this.template.fields.forEach((field) => {
            if (field.type === 'radio') {
                field.values.forEach((value) => {
                    this.editFieldElements[field.header + '-' + value.header] =
                        document.getElementById('edit-' + field.header + '-' + value.header)
                })
            } else if (field.type) {
                this.editFieldElements[field.header] = document.getElementById('edit-' + field.header)
            }
        });
    }

    public origPosition(): void {
        this.zoom.scaleTo(this.svg, 1);
        const origX = this.margin.left + (document.getElementById('genmapper-graph').clientWidth / 2);
        const origY = this.margin.top;
        const parsedTransform = this._parseTransform(this.g.attr('transform'));
        this.zoom.translateBy(this.svg, origX - parsedTransform.translate[0], origY - parsedTransform.translate[1]);
    }

    private _setSvgHeight(): void {
        const windowHeight = document.documentElement.clientHeight;
        const leftMenuHeight = document.getElementById('left-menu').clientHeight;
        const height = Math.max(windowHeight, leftMenuHeight + 10) - this.config.outerHeaderHeight;
        d3.select('#genmapper-graph-svg').attr('height', height);
    }

    private _getInitialValue(field: GMField): string | number {
        if (field.initialTranslationCode) {
            return i18next.t('template.' + field.initialTranslationCode);
        } else {
            return field.initial;
        }
    }

    private _parseTransform(a: any): any {
        const b = {};
        let i;

        // tslint:disable-next-line:forin
        for (i in a = a.match(/(\w+\((-?\d+.?\d*e?-?\d*,?)+\))+/g)) {
            const c = a[i].match(/[\w.-]+/g);
            b[c.shift()] = c;
        }

        return b;
    }


    private _setKeyboardShorcuts(): void {
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) {
                if (this.alertElement.classList.contains('alert-message--active')) {
                    this.alertElement.classList.remove('alert-message--active')
                } else {
                    document.getElementById('intro').classList.remove('intro--active')
                    this.editGroupElement.classList.remove('edit-group--active')
                }
            } else if (e.keyCode === 13) {
                // hitting enter is like submitting changes in the edit window
                if (this.editGroupElement.classList.contains('edit-group--active')) {
                    document.getElementById('edit-submit').click()
                }
            }
        })
    }

    private loadHTMLContent() {

        // document.getElementById('left-menu').innerHTML = '<div id="template-logo">' +
        //     i18next.t('template.logo', '') +
        //     '<button onclick="genmapper.introSwitchVisibility()"' +
        //     'class="hint--rounded hint--right"' + 'aria-label="' + i18next.t('menu.helpAbout') +
        //     '"><img src="../icons/266-question.svg"></button>' +
        //     '<div class="dropdown" id="lang-selector">' +
        //     '<button aria-label="Language"><img src="../icons/203-earth.svg"></button>' +
        //     '<ul class="dropdown-content">' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-en">English</button></li>' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-cs">Čeština</button></li>' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-de">Deutsch</button></li>' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-es">Español</button></li>' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-pl">Polski</button></li>' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-ro">Română</button></li>' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-ru">Русский</button></li>' +
        //     '  <li><button onclick="genmapper.switchLanguage(this)" id="lang-sq">Shqip</button></li>' +
        //     '</ul>' +
        //     '</div>' +
        //     '<button id="project-name" class="hint--rounded hint--right" aria-label=""><img src="../icons/039-file-text2.svg"></button>' +
        //     '<button onclick="genmapper.origPosition();" class="hint--rounded hint--right" aria-label="' + i18next.t('menu.originalZoom') + '"><img src="../icons/135-search.svg"></i></button>' +
        //     '<button onclick="genmapper.zoomIn();" class="hint--rounded hint--right" aria-label="' + i18next.t('menu.zoomIn') + '"><img src="../icons/136-zoom-in.svg"></i></button>' +
        //     '<button onclick="genmapper.zoomOut();" class="hint--rounded hint--right" aria-label="' + i18next.t('menu.zoomOut') + '"><img src="../icons/137-zoom-out.svg"></i></button>' +
        //     '<button onclick="genmapper.onLoad(\'file-input\')" class="hint--rounded hint--right" aria-label="' + i18next.t('menu.importXlsxCsv') + '"><img src="../icons/098-upload.svg"></button>' +
        //     '<input type="file" id="file-input" onchange="genmapper.importFile()" style="display:none;">' +
        //     '<button onclick="genmapper.outputCsv()" class="hint--rounded hint--right" aria-label="' + i18next.t('menu.exportCsv') + '"><img src="../icons/097-download.svg"></button>' +
        //     '<button onclick="genmapper.printMap(\'vertical\');" class="hint--rounded hint--right" aria-label="' + i18next.t('menu.btnPrintVertical') + '"><img src="../icons/print-vertical.svg"></button>' +
        //     '<button onclick="genmapper.printMap(\'horizontal\');" class="hint--rounded hint--right" aria-label="' + i18next.t('menu.btnPrintHorizontal') + '"><img src="../icons/print-horizontal.svg"></button>'

        document.getElementById('edit-group').innerHTML =
            '<div id="edit-group-content">' +
            '  <button id="edit-cancel" class="hint--rounded hint--bottom" aria-label="' + i18next.t('editGroup.btnCancel') + ' ( Esc )">X</button>' +
            '  <h1>' + i18next.t('editGroup.editGroup') + '</h1>' +
            '  <form>' +
            '    <table>' +
            '      <tr>' +
            '        <td class="left-field">' + i18next.t('editGroup.elementParent') + '</td>' +
            '        <td class="right-field"><select id="edit-parent"></select></td>' +
            '      </tr>' +
            '    </table>' +
            '  </form>' +
            '  <div id="edit-buttons">' +

            '    <button id="edit-submit" class="hint--rounded hint--bottom" aria-label="( Enter &crarr; )">' + i18next.t('editGroup.btnSubmit') + '</button>' +
            '    <button id="edit-delete">' + i18next.t('editGroup.btnDelete') + '</button>' +
            '    <button onclick="genmapper.onLoad(\'file-input-subtree\')">' + i18next.t('editGroup.btnImportSubtree') + '</button>' +
            '    <input type="file" id="file-input-subtree" style="display:none;">' +
            '    <button id="edit-export-subtree">' + i18next.t('editGroup.btnExportSubtree') + '</button>' +
            '  </div>' +
            '</div>'

        // document.getElementById('intro-content').innerHTML =
        //     '<button class="cancel" onclick="genmapper.introSwitchVisibility()">X</button>' +
        //     '<h2>' +
        //     i18next.t('help.genmapperHelp') + '</h2>' +
        //     '<p>' + i18next.t('help.introContent') + '</p>' +
        //     i18next.t('template.helpLegend') +
        //     '<h3>' + i18next.t('help.importExportHeader') + '</h3>' +
        //     '<p><strong style="color:red">' + i18next.t('help.importExportWarningChangesLost') + '</strong><br>' +
        //     i18next.t('help.importExportContent') + '<br><br>' +
        //     i18next.t('help.exportSafariIssuePart1') +
        //     '<img src="../safari-export-issue-0.png" style="margin:10px; margin-left:0px;" alt="safari export issue"><br>' + i18next.t('help.exportSafariIssuePart2') +
        //     '<br><img src="../safari-export-issue-1.png" style="margin:10px; margin-left:0px;" alt="safari export issue">' +
        //     '<br>' + i18next.t('help.exportToPdf') + '</p>' +
        //     '<h3>' + i18next.t('help.panZoomHeader') + '</h3>' +
        //     '<p>' + i18next.t('help.panZoomContent') + '</p>' +
        //     '<h3>' + i18next.t('help.keyboardShortcutsHeader') + '</h3>' +
        //     '<p>' + i18next.t('help.keyboardShortcutsContent') + '</p>' +
        //     '<h3>' + i18next.t('help.changelogHeader') + '</h3>' +
        //     '<p><a href="https://github.com/dvopalecky/gen-mapper/blob/master/changelog.md">' +
        //     i18next.t('help.changelogLink') + '</a><br>' +
        //     i18next.t('help.genmapperVersion') + ': <span id="gen-mapper-version"></span><br>' +
        //     i18next.t('help.templateVersion') + ': <span id="template-version"></span></p>' +
        //     '<h3>' + i18next.t('help.creditsHeader') + '</h3>' +
        //     '<p>' + i18next.t('help.creditsThanks1') + '<br>' +
        //     i18next.t('help.creditsJavaScriptLibraries') +
        //     ': <a href="https://github.com/chinchang/hint.css/">hint.css</a>, <a href="https://d3js.org">d3.js</a>, <a href="https://github.com/eligrey/FileSaver.js/">FileSaver.js</a>, <a href="https://github.com/SheetJS/js-xlsx">js-xlsx</a>, ' +
        //     '<a href="https://lodash.com">lodash</a> ' +
        //     i18next.t('help.creditsAnd') +
        //     ' <a href="https://www.i18next.com">i18next</a><br>' +
        //     i18next.t('help.creditsIcons') +
        //     ': <a href="https://github.com/Keyamoon/IcoMoon-Free">IcoMoon-Free</a><br><br>' +
        //     i18next.t('help.creditsCopyright') + '<br>' +
        //     i18next.t('help.creditsLicense') + '<br>' +
        //     '<a href="https://github.com/dvopalecky/gen-mapper">' + i18next.t('help.creditsGithub') + '</a><br>' +
        //     i18next.t('help.creditsSuggestions') + '<br></p>' +
        //     '<button class="ok" onclick="genmapper.introSwitchVisibility()">' + i18next.t('help.btnOKStart') + '</button>'

        // document.getElementById('alert-message').innerHTML =
        //     '<div id="alert-message-content">' +
        //     '  <p id="alert-message-text"></p>' +
        //     '  <button class="close-alert" onclick="genmapper.closeAlert()">' + i18next.t('messages.btnOK') + '</button>' +
        //     '</div>'

        // document.getElementById('gen-mapper-version').innerHTML = this.appVersion
        // document.getElementById('template-version').innerHTML = this.template.name
    }

    private zoomIn() {
        this.zoom.scaleBy(this.svg, 1.2)
    }

    private zoomOut() {
        this.zoom.scaleBy(this.svg, 1 / 1.2)
    }

    private onLoad(fileInputElementId) {
        const fileInput = document.getElementById(fileInputElementId) as HTMLInputElement;
        fileInput.value = ''
        fileInput.click()
    }

    private displayAlert(message) {
        // this.alertElement.classList.add('alert-message--active')
        // document.getElementById('alert-message-text').innerHTML = message
    }

    private closeAlert() {
        this.alertElement.classList.remove('alert-message--active')
        document.getElementById('alert-message-text').innerHTML = null
    }

    public introSwitchVisibility() {
        this.introVisibility = !this.introVisibility;
        document.getElementById('intro').classList.toggle('')
    }

    public onSelectNode = (d): void => {
        this.popupEditGroupModal(d);
    }

    private popupEditGroupModal(d) {
        this.editGroupElement.classList.add('edit-group--active')
        this._setEditFieldElements();
        this.template.fields.forEach((field) => {
            if (field.type === 'text') {
                this.editFieldElements[field.header].value = d.data[field.header]
            } else if (field.type === 'radio') {
                field.values.forEach((value) => {
                    const status = (value.header === d.data[field.header])
                    this.editFieldElements[field.header + '-' + value.header].checked = status
                })
            } else if (field.type === 'checkbox') {
                this.editFieldElements[field.header].checked = d.data[field.header]
            }
        })
        // select first element
        this.editFieldElements[Object.keys(this.editFieldElements)[0]].select()

        const nodeData = d.data
        const node = d
        // this.editParentElement.innerHTML = d.parent ? d.parent.data.name : 'N/A'
        this.makeSelectForParent(node)

        d3.select('#edit-parent').on('change', () => { this.changedSelectParent() })
        d3.select('#edit-submit').on('click', () => { this.editGroup(nodeData) })
        d3.select('#edit-cancel').on('click',
            () => { this.editGroupElement.classList.remove('edit-group--active') })
        d3.select('#edit-delete').on('click', () => { this.removeNode(node) })
        d3.select('#file-input-subtree').on('change', () => { this.importFileSubtree(node) })
        d3.select('#edit-export-subtree').on('click', () => { this.outputCsvSubtree(node) })
    }

    private makeSelectForParent(node): void {
        this.editParentElement.innerHTML = ''
        const names = this.getNames(node)
        names.forEach((node) => {
            const option = document.createElement('option')
            option.text = node[1]
            option.value = node[0];
            this.editParentElement.add(option)
        });
        if (node.parent) {
            this.editParentElement.value = node.parent.id;
        }
    }

    private changedSelectParent(): void {
        this.displayAlert(i18next.t('messages.changedParent'));
    }

    private getNames(node) {
        // get Array of [id, name] for all nodes except input node
        // and its descendants
        const allNodes = this.nodes.descendants();
        const nodeAndDescendants = node.descendants();
        const nodes = _.differenceWith(allNodes, nodeAndDescendants);
        const output = [];
        nodes.forEach((node) => {
            output.push([node.data.id, node.data.name])
        });
        output.sort((a, b) => a[1].localeCompare(b[1]));
        return output;
    }

    private getDirectChildrenCount() {
        const output = {};
        this.nodes.descendants().forEach((node) => {
            let count = 0
            if (node.children) { count = node.children.length }
            output[node.data.id] = count
        });
        return output;
    }

    private editGroup(groupData) {
        this.hasUnsavedChanges = true;
        this.template.fields.forEach((field) => {
            if (field.type === 'text') {
                groupData[field.header] = this.editFieldElements[field.header].value
            } else if (field.type === 'radio') {
                field.values.forEach((value) => {
                    if (this.editFieldElements[field.header + '-' + value.header].checked) {
                        groupData[field.header] = value.header
                    }
                })
            } else if (field.type === 'checkbox') {
                groupData[field.header] = this.editFieldElements[field.header].checked
            }
        });

        let parentIdFromEditWindow = parseFloat(this.editParentElement.value);
        if (isNaN(parentIdFromEditWindow)) { parentIdFromEditWindow = null; }
        groupData.parentId = parentIdFromEditWindow;

        this.editGroupElement.classList.remove('edit-group--active');
        this.redraw(this.template);
    }

    private printMap(printType) {
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
        if (printType === 'horizontal') {
            const printHeight = 700;
            const printWidth = 1200;

            // resize for printing
            this.svg.attr('width', printWidth)
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
        d3.select('#left-menu').style('display', 'none');
        d3.select('#genmapper-graph').style('float', 'left');
        d3.selectAll('#genmapper-graph-svg').style('background', 'white');

        window.print();

        // change CSS back after printing
        this.svg.attr('width', origWidth)
            .attr('height', origHeight);
        this.g.attr('transform', origTransform);
        d3.select('#left-menu').style('display', null);
        d3.select('#genmapper-graph').style('float', null);
        d3.selectAll('#genmapper-graph-svg').style('background', null);
    }

    private redraw(template): void {
        // declares a tree layout and assigns the size
        const tree = d3.tree()
            .nodeSize([template.settings.nodeSize.width,
            template.settings.nodeSize.height])
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
                    'C' + d.x + ',' + (d.y + (d.parent.y + boxHeight)) / 2 +
                    ' ' + d.parent.x + ',' + (d.y + (d.parent.y + boxHeight)) / 2 +
                    ' ' + d.parent.x + ',' + (d.parent.y + boxHeight);
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
                return d.y * (1 - LINK_TEXT_POSITION) + (d.parent.y + boxHeight) * LINK_TEXT_POSITION;
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
        this.appendRemoveButton(newGroup);
        this.appendAddButton(newGroup);

        // append SVG elements without fields
        Object.keys(template.svg).forEach((svgElement) => {
            const svgElementValue = template.svg[svgElement];
            const element = newGroup.append(svgElementValue['type']);
            element.attr('class', 'node-' + svgElement);
        });

        // append SVG elements related to fields
        template.fields.forEach((field) => {
            if (field.svg) {
                const element = newGroup.append(field.svg['type']);
                element.attr('class', 'node-' + field.header);
                Object.keys(field.svg.attributes).forEach((attribute) => {
                    element.attr(attribute, field.svg.attributes[attribute])
                });
                if (field.svg.style) {
                    Object.keys(field.svg.style).forEach((styleKey) => {
                        element.style(styleKey, field.svg.style[styleKey])
                    });
                }
            }
        });

        // UPDATE including NEW
        const nodeWithNew = node.merge(newGroup);
        nodeWithNew.attr('class', (d) => {
            return 'node' + (d.data.active ? ' node--active' : ' node--inactive');
        })
            .attr('transform', (d) => {
                return 'translate(' + d.x + ',' + d.y + ')';
            })
            .on('click', (d) => { this.onSelectNode(d); });

        nodeWithNew.select('.removeNode')
            .on('click', (d) => { this.removeNode(d); d3.event.stopPropagation(); });

        nodeWithNew.select('.addNode')
            .on('click', (d) => { this.addNode(d); d3.event.stopPropagation(); });

        // refresh class and attributes in SVG elements without fields
        // in order to remove any additional classes or settings from inherited fields
        Object.keys(template.svg).forEach((svgElement) => {
            const svgElementValue = template.svg[svgElement];
            const element = nodeWithNew.select('.node-' + svgElement)
                .attr('class', 'node-' + svgElement);
            Object.keys(svgElementValue.attributes).forEach((attribute) => {
                element.attr(attribute, svgElementValue.attributes[attribute])
            });
        });

        // update node elements which have SVG in template
        template.fields.forEach((field) => {
            if (field.svg) {
                const element = nodeWithNew.select('.node-' + field.header);
                this.updateSvgForFields(field, element);
            }
            if (field.inheritsFrom) {
                const element = nodeWithNew.select('.node-' + field.inheritsFrom);
                this.updateFieldWithInherit(field, element);
            }
        });
    }

    private updateFieldWithInherit(field, element) {
        if (!element.empty()) {
            if (field.type === 'checkbox') { this.updateCheckboxField(field, element); }
            if (field.type === 'radio') { this.updateRadioField(field, element); }
        }
    }

    private updateCheckboxField(field, element) {
        // add class to the element which the field inherits from
        if (field.class) {
            element.attr('class', function (d) {
                const checked = d.data[field.header];
                const class_ = checked ? field.class.checkedTrue : field.class.checkedFalse;
                return this.classList.value + ' ' + class_;
            });
        }
        if (typeof field.attributes !== 'undefined' &&
            typeof field.attributes.rx !== 'undefined') {
            element.attr('rx', function (d) {
                const checked = d.data[field.header];
                const rxObj = field.attributes.rx;
                const rx = checked ? rxObj.checkedTrue : rxObj.checkedFalse;
                return String(rx);
            });
        }
    }

    private updateRadioField(field, element) {
        const self = this;
        // add class to the element which the field inherits from
        element.attr('class', function (d) {
            const fieldValue = self.getFieldValueForRadioType(field, d);
            if (fieldValue.class) {
                return this.classList.value + ' ' + fieldValue.class;
            } else {
                return this.classList.value;
            }
        });
        element.attr('rx', function (d) {
            const fieldValue = self.getFieldValueForRadioType(field, d);
            if (typeof fieldValue.attributes !== 'undefined' &&
                typeof fieldValue.attributes.rx !== 'undefined') {
                return String(fieldValue.attributes.rx);
            } else {
                return this.rx.baseVal.valueAsString;
            }
        });
    }

    private getFieldValueForRadioType(field, d) {
        let fieldValue = _.filter(field.values, { header: d.data[field.header] })[0];
        if (typeof fieldValue === 'undefined') {
            fieldValue = _.filter(field.values, { header: field.initial })[0];
        }
        return fieldValue;
    }

    private updateSvgForFields(field, element) {
        element.text(function (d) {
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
            element.style('display', function (d) { return d.data[field.header] ? 'block' : 'none'; });
        }
    }

    private appendRemoveButton(group) {
        group.append('g')
            .attr('class', 'removeNode')
            .append('svg')
            .html(
                '<rect x="40" y="0" rx="7" width="25" height="40">' +
                '<title>' + i18next.t('editGroup.hoverDeleteGroupAndSubtree') + '</title>' +
                '</rect>' +
                '<line x1="46" y1="13.5" x2="59" y2="26.5" stroke="white" stroke-width="3"></line>' +
                '<line x1="59" y1="13.5" x2="46" y2="26.5" stroke="white" stroke-width="3"></line>'
            );
    }

    private appendAddButton(group) {
        group.append('g')
            .attr('class', 'addNode')
            .append('svg')
            .html(
                '<rect x="40" y="40" rx="7" width="25" height="40">' +
                '<title>' + i18next.t('editGroup.hoverAddChildGroup') + '</title>' +
                '</rect>' +
                '<line x1="45" y1="60" x2="60" y2="60" stroke="white" stroke-width="3"></line>' +
                '<line x1="52.5" y1="52.5" x2="52.5" y2="67.5" stroke="white" stroke-width="3"></line>'
            );
    }

    private addNode(d) {
        this.hasUnsavedChanges = true;
        const newNodeData = {};
        this.template.fields.forEach((field) => {
            newNodeData[field.header] = this._getInitialValue(field);
        });
        newNodeData['id'] = this.findNewId();
        newNodeData['parentId'] = d.data.id;
        this.data.push(newNodeData);
        this.redraw(this.template);
    }

    private findNewId() {
        const ids = _.map(this.data, function (row) { return row.id; });
        return this.findNewIdFromArray(ids);
    }

    /*
     * Find smallest int >= 0 not in array
     */
    private findNewIdFromArray(arr) {
        // copy and sort
        arr = arr.slice().sort(function (a, b) { return a - b; });
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

    public confirmDelete = (confirmMessage: string, callback: Function) => {
        if (window.confirm(confirmMessage)) {
            callback();
        }
    }

    private removeNode(d) {
        this.hasUnsavedChanges = true;
        if (!d.parent) {
            this.displayAlert(i18next.t('messages.errDeleteRoot'));
        } else {
            let confirmMessage;
            if (!d.children) {
                confirmMessage = i18next.t(
                    'messages.confirmDeleteGroup', { groupName: d.data.name });
            } else {
                confirmMessage = i18next.t(
                    'messages.confirmDeleteGroupWithChildren', { groupName: d.data.name });
            }

            this.confirmDelete(confirmMessage, () => {
                this.deleteAllDescendants(d);
                const nodeToDelete = _.filter(this.data, { id: d.data.id });
                if (nodeToDelete) {
                    this.data = _.without(this.data, nodeToDelete[0]);
                }
            });
        }

        // this.editGroupElement.classList.remove('edit-group--active');
        this.redraw(this.template);
    }

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

    private outputCsv() {
        this.outputCsvSubtree(this.nodes);
        this.hasUnsavedChanges = false;
    }

    private outputCsvSubtree(node) {
        const tmpData = node.descendants().map(x => x.data);
        tmpData[0].parentId = '';
        const out = d3.csvFormatRows(tmpData.map(function (d, i) {
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
        const blob = new Blob([this.csvHeader + out], { type: 'text/csv;charset=utf-8' });
        const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent && !navigator.userAgent.match('CriOS');
        const promptMessage = isSafari
            ? i18next.t('messages.saveAsInSafari')
            : i18next.t('messages.saveAs');
        const saveName = window.prompt(promptMessage, this.projectName + '.csv');
        if (saveName === null) { return; }
        saveAs(blob, saveName);
    }

    private importJSON(jsonString) {
        const tree = JSON.parse(jsonString);
        try {
            this.validTree(tree);
        } catch (err) {
            this.displayImportError(err);
            return;
        }
        this.hasUnsavedChanges = false;
        this.data = tree;
        this.redraw(this.template);
    }

    private importFile() {
        this.importFileFromInput('file-input', (filedata, filename) => {
            const parsedCsv = this.parseAndValidateCsv(filedata, filename);
            if (parsedCsv === null) { return; }
            this.hasUnsavedChanges = false;
            this.data = parsedCsv;
            const regex = /(.+?)(\.[^.]*$|$)/;
            const filenameNoExtension = regex.exec(filename)[1];
            this.projectName = filenameNoExtension;
            d3.select('#project-name')
                .attr('aria-label', i18next.t('messages.editProjectName') + ': ' + this.projectName);
            this.redraw(this.template);
        });
    }

    private importFileSubtree(d) {
        if (!window.confirm(i18next.t(
            'messages.confirmImportSubtreeOverwrite', { groupName: d.data.name }))) {
            return;
        }
        this.hasUnsavedChanges = true;
        this.importFileFromInput('file-input-subtree', (filedata, filename) => {
            const parsedCsv = this.parseAndValidateCsv(filedata, filename);
            if (parsedCsv === null) { return; }
            this.csvIntoNode(d, parsedCsv);
            this.redraw(this.template);
            this.editGroupElement.classList.remove('edit-group--active');
        });
    }

    /**
     * If error occurs, displays error and returns null
     * If not, raises error
     */
    private parseAndValidateCsv(filedata, filename) {
        try {
            const csvString = this.fileToCsvString(filedata, filename);
            const parsedCsv = this._parseCsvData(csvString);
            this.validTree(parsedCsv);
            return parsedCsv;
        } catch (err) {
            this.displayImportError(err);
            return null;
        }
    }

    /**
     * Checks if parsedCsv creates a valid tree.
     * If not, raises error
     */
    private validTree(parsedCsv) {
        const treeTest = d3.tree();
        const stratifiedDataTest = d3.stratify()(parsedCsv);
        treeTest(stratifiedDataTest);
    }

    private displayImportError(err) {
        if (err.toString().includes('>= 0.') || err.toString().includes('Wrong type')) {
            this.displayAlert(i18next.t('messages.errImport') + ' <br>' + err.toString());
        } else {
            this.displayAlert(i18next.t('messages.errImport') + '<br><br>' +
                i18next.t('messages.errImportWhatToCheck'));
        }
    }

    private deleteAllDescendants(d) {
        this.hasUnsavedChanges = true;
        let idsToDelete = _.map(d.children, function (row) { return parseFloat(row.id); });
        while (idsToDelete.length > 0) {
            const currentId = idsToDelete.pop();
            const childrenIdsToDelete = _.map(_.filter(this.data, { parentId: currentId }),
                function (row) { return row.id; });
            idsToDelete = idsToDelete.concat(childrenIdsToDelete);
            const nodeToDelete = _.filter(this.data, { id: currentId });
            if (nodeToDelete) { this.data = _.without(this.data, nodeToDelete[0]); }
        }
    }

    private csvIntoNode(d, parsedCsv) {
        this.deleteAllDescendants(d);

        // replace node by root of imported
        const nodeToDelete = _.filter(this.data, { id: d.data.id })[0];
        const rowRootOfImported = _.filter(parsedCsv, { parentId: '' })[0];
        const mapOldIdToNewId = {};
        mapOldIdToNewId[rowRootOfImported.id] = nodeToDelete.id;
        parsedCsv = _.without(parsedCsv, rowRootOfImported);
        rowRootOfImported.id = nodeToDelete.id;
        rowRootOfImported.parentId = nodeToDelete.parentId;
        this.data[_.indexOf(this.data, nodeToDelete)] = rowRootOfImported;

        const idsUnsorted = _.map(this.data, function (row) { return row.id; });
        const ids = idsUnsorted.sort(function (a, b) { return a - b; });
        // update ids of other nodes and push into data
        while (parsedCsv.length > 0) {
            const row = parsedCsv.shift();
            if (!(row.id in mapOldIdToNewId)) {
                const newId = this.findNewIdFromArray(ids);
                mapOldIdToNewId[row.id] = newId;
                ids.push(newId);
            }
            if (!(row.parentId in mapOldIdToNewId)) {
                const newId = this.findNewIdFromArray(ids);
                mapOldIdToNewId[row.parentId] = newId;
                ids.push(newId);
            }
            // change id and parentId
            row.id = mapOldIdToNewId[row.id];
            row.parentId = mapOldIdToNewId[row.parentId];
            this.data.push(row);
        }
    }

    private importFileFromInput(fileInputElementId, callback) {
        if (typeof window['FileReader'] !== 'function') {
            this.displayAlert('The file API isn\'t supported on this browser yet.');
            return;
        }

        const input = document.getElementById(fileInputElementId) as HTMLInputElement;
        if (!input) {
            this.displayAlert('Um, couldn\'t find the fileinput element.');
        } else if (!input.files) {
            this.displayAlert(
                'This browser doesn\'t seem to support the \'files\' property of file inputs.');
        } else if (!input.files[0]) {
            this.displayAlert(i18next.t('messages.selectFile'));
        } else {
            const file = input.files[0];
            const filename = file.name;
            const fr = new FileReader();
            fr.onload = () => {
                const filedata = fr.result;
                callback(filedata, filename);
            };
            const extension = /(?:\.([^.]+))?$/.exec(filename)[1];
            if (extension === 'csv') {
                fr.readAsText(file);
            } else {
                fr.readAsBinaryString(file);
            }
        }
    }

    private fileToCsvString(filedata, filename) {
        const regex = /(?:\.([^.]+))?$/;
        const extension = regex.exec(filename)[1].toLowerCase();
        let csvString;

        if (extension === 'xls' || extension === 'xlsx') {
            const workbook = XLSX.read(filedata, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            csvString = XLSX.utils.sheet_to_csv(worksheet);
        } else if (extension === 'csv') {
            csvString = filedata;
        } else {
            throw new Error(i18next.t('messages.errWrongFileType'));
        }
        csvString = csvString.replace(/\r{1,2}\n?/g, '\n');
        // replace first line with a default one
        return this.csvHeader + csvString.substring(csvString.indexOf('\n') + 1);
    }

    private addFieldsToEditWindow(template) {
        template.fields.forEach((field) => {
            if (field.type) {
                // add table row
                const tr = d3.select('#edit-group-content')
                    .select('form')
                    .select('table')
                    .append('tr');
                // add left column
                const fieldDesciption = i18next.t('template.' + field.header) + ':';
                tr.append('td')
                    .text(fieldDesciption)
                    .attr('class', 'left-field');
                // add right column
                const td = tr.append('td')
                    .attr('class', 'right-field');
                if (field.type === 'radio') {
                    for (const value of field.values) {
                        const valueDescription = i18next.t('template.' + value.header);
                        td.append('input')
                            .attr('type', field.type)
                            .attr('name', field.header)
                            .attr('value', value.header)
                            .attr('id', 'edit-' + field.header + '-' + value.header);
                        td.append('span')
                            .html(valueDescription);
                        td.append('br');
                    }
                } else {
                    td.append('input')
                        .attr('type', field.type)
                        .attr('name', field.header)
                        .attr('id', 'edit-' + field.header);
                }
            }
        });
    }

    private switchLanguage(lang: string) {
        this.language = lang;
        i18next.changeLanguage(this.language);
        this.updateDOMafterLangSwitch();
        this.redraw(this.template);
    }

    private updateDOMafterLangSwitch() {
        this.loadHTMLContent();
        this.addFieldsToEditWindow(this.template);
        // document.getElementById('lang-' + this.language).className = 'current-lang';
        d3.select('#project-name')
            .attr('aria-label', i18next.t('messages.editProjectName') + ': ' + this.projectName)
            .on('click', () => {
                let userInput = window.prompt(i18next.t('messages.editProjectName'), this.projectName);
                if (userInput === null) { return; }
                userInput = userInput.trim();
                if (userInput === '') {
                    this.displayAlert(i18next.t('messages.errProjectNameEmpty'));
                } else {
                    this.projectName = userInput;
                    d3.select('#project-name')
                        .attr('aria-label', i18next.t(
                            'messages.editProjectName') + ': ' + this.projectName);
                }
            });
        this.editFieldElements = {};
        this.template.fields.forEach((field) => {
            if (field.type === 'radio') {
                field.values.forEach((value) => {
                    this.editFieldElements[field.header + '-' + value.header] =
                        document.getElementById('edit-' + field.header + '-' + value.header);
                });
            } else if (field.type) {
                this.editFieldElements[field.header] = document.getElementById('edit-' + field.header);
            }
        });
        this.editParentElement = document.getElementById('edit-parent');
    }

    private alertForNonSupportedBrowsers() {
        const isIE = /*@cc_on!@*/false || !!document['documentMode'];
        const isEdge = !isIE && !!window['StyleMedia'];
        if (isIE || isEdge) {
            this.displayAlert(i18next.t('messages.unsupportedBrowser'));
        }
    }
}
