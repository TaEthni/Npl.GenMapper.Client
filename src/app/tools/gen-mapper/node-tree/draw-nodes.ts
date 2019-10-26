import { Selection } from 'd3';
import { NodeDatum } from '../gen-mapper.interface';
import { Template } from '../template.model';
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
        .classed('node--active', (d) => d.data.active)
        .classed('node--inactive', (d) => !d.data.active)
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
                .filter(field => d.data[field.id])
                .forEach((field, i) => {
                    svg += `<text text-anchor="start" y="${boxHeight + (i + line) * textHeight}">${d.data[field.id]}</text>`;
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
}
