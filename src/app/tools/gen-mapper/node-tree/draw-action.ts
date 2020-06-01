import { Template } from '@models/template.model';
import { GMSvgAction } from '@templates';
import { Selection } from 'd3';
import { NodeDatum } from '../gen-mapper.interface';
import { applySVGAttrsAndStyle } from './d3-util';

export function drawAction(group: Selection<SVGGElement, NodeDatum, SVGGElement, any>, template: Template, action: GMSvgAction): void {
    const width = action.attributes.width || 28;
    const height = action.attributes.height || 40;

    const svg = group.append('g')
        .attr('class', action.id)
        .attr('cursor', 'pointer')
        .classed('node-action', true)
        .classed(action.control, true)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`);

    action.attributes = action.attributes || {};
    action.attributes.width = action.attributes.width || width;
    action.attributes.height = action.attributes.height || height;

    applySVGAttrsAndStyle(action, svg);

    svg.html(`
            <rect x="2px" y="2px" rx="7" height="${height - 4}" width="${width - 4}"></rect>
            <title>${action.tooltipi18nValue}</title>
            </rect>
            <text x="${action.iconX}" y="${action.iconY}" text-anchor="middle">
                <tspan class="material-icons">${action.iconName}</tspan>
            </text>
        `);
}
