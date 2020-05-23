import { Template } from '@models/template.model';
import { ControlType } from '@templates';
import { select, Selection } from 'd3';
import moment from 'moment';
import { NodeDatum } from '../gen-mapper.interface';
import { applySVGAttrsAndStyle } from './d3-util';
import { drawAction } from './draw-action';


export function drawNodes(node: Selection<SVGGElement, NodeDatum, SVGGElement, any>, source: NodeDatum, template: Template): Selection<SVGGElement, NodeDatum, SVGGElement, any> {

    const nodeEnter = node.enter().append('g');

    drawNodeEnter(nodeEnter, source, template);

    const nodeUpdate = nodeEnter.merge(node);

    drawNodeUpdate(nodeUpdate, template);

    node.exit().remove();

    return nodeUpdate;
}

function drawNodeEnter(nodeEnter: Selection<SVGGElement, NodeDatum, SVGGElement, undefined>, source: NodeDatum, template: Template): void {
    nodeEnter
        .classed('node', true)
    // Transform to source

    nodeEnter.append('rect')
        .attr('class', 'hidden-rect')
        .attr('width', 36)
        .attr('height', 100)
        .attr('x', (template.svgSettings.nodeBounds.width / 2) - 26);

    // append Template SVGS
    template.svgs.forEach((svg) => {
        if (svg.type === 'image') {
            svg.attributes.width = svg.attributes.width || template.svgSettings.iconSize;
            svg.attributes.height = svg.attributes.height || template.svgSettings.iconSize;
        }

        const g = nodeEnter
            .append('g')
            .classed('group-' + svg.id, true);

        const element = g
            .append(svg.type)
            .classed('node-' + svg.id, true);

        g.append('title').text(svg.tooltipi18nValue);

        applySVGAttrsAndStyle(svg, element);
    });

    template.svgActions.forEach(action => {
        drawAction(nodeEnter, template, action);
    });

    nodeEnter.append('g').attr('class', 'node-labels');
}

function drawNodeUpdate(nodeUpdate: Selection<SVGGElement, NodeDatum, SVGGElement, undefined>, template: Template): void {
    const nodeLabelFields = template.fields
        .filter(f => f.isNodeSvgLabel)
        .sort((a, b) => a.nodeSvgLabelOrder - b.nodeSvgLabelOrder);

    nodeUpdate
        .attr('node-id', d => d.data.id)
        .classed('node--active', (d) => d.data.attributes.active)
        .classed('node--inactive', (d) => !d.data.attributes.active)
        .attr('transform', (d) => {
            return 'translate(' + d.x + ',' + d.y + ')';
        })

    nodeUpdate.select('.node-labels')
        .html(d => {
            let line = 1;
            const textHeight = template.svgSettings.textHeight;
            const boxHeight = template.svgSettings.boxHeight;

            let svg = '';
            nodeLabelFields
                .filter(field => d.data.attributes[field.id])
                .forEach((field, i) => {
                    let value = d.data.attributes[field.id];

                    if (field.type === ControlType.date) {
                        value = moment(new Date(value)).format('YYYY-MM');
                    }

                    svg += `<text text-anchor="start" y="${boxHeight + (i + line) * textHeight}">${value}</text>`;
                });
            return svg;
        });



    // refresh class and attributes in SVG elements without fields
    // // in order to remove any additional classes or settings from inherited fields
    template.svgs.forEach((svg) => {
        const element = nodeUpdate.select('.node-' + svg.id);
        applySVGAttrsAndStyle(svg, element);

        if (svg.state) {
            svg.state.forEach(state => {
                if (state.setText) {
                    element.text((d) => {
                        if (d.data.attributes[state.fieldRef] || d.data.attributes[state.fieldRef] === 0) {
                            if (Array.isArray(d.data.attributes[state.fieldRef])) {
                                return d.data.attributes[state.fieldRef].join('');
                            }

                            return d.data.attributes[state.fieldRef];
                        }
                    });
                }

                if (state.setIcon) {
                    element.attr('xlink:href', (d) => {
                        const fieldValue = d.data.attributes[state.fieldRef];
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
                            if (d.data.attributes[state.fieldRef] === state.fieldRefValues[i].value) {
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
                                if (d.data.attributes[state.fieldRef] === state.fieldRefValues[i].value) {
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

    nodeUpdate.each(function (d) {

        const node = select(this);

        template.svgs.forEach(svg => {
            if (!svg.states) { return; }

            const element = node.select('.node-' + svg.id);

            svg.states.forEach(state => {
                const fieldId = state.fieldRefId;
                const value = d.data.attributes[fieldId];

                if (state.setText) {
                    if (Array.isArray(value)) {
                        element.text(value.join(''));
                    } else {
                        element.text(value);
                    }
                    return;
                }

                if (value === state.fieldRefValue) {
                    applySVGAttrsAndStyle(state.svg, element);
                }
            });
        });
    });
}
