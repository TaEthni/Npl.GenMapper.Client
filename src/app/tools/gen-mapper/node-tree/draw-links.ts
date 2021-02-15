import { Template } from '@npl-models/template.model';
import { Selection } from 'd3';

import { NodeDatum } from '../gen-mapper.interface';

const LINK_TEXT_POSITION = 0.3;

export function drawLinks(
    link: Selection<SVGPathElement, NodeDatum, SVGGElement, any>,
    linkText: Selection<SVGTextElement, NodeDatum, SVGGElement, any>,
    template: Template): void {

    link.exit()
        .remove();

    linkText.exit()
        .remove();

    link.enter()
        .append('path')
        .attr('opacity', 0)
        .merge(link)
        .attr('class', 'link')
        .transition()
        .duration(500)
        .attr('d', elbow(template))
        .attr('opacity', 1);

    linkText.enter()
        .append('text')
        .merge(linkText)
        .attr('class', (d) => {
            return 'link-text ' + (
                d.data.attributes.active ? ' link-text--active' : ' link-text--inactive');
        })
        .attr('x', (d) => {
            return d.x * (1 - LINK_TEXT_POSITION) + d.parent.x * LINK_TEXT_POSITION;
        })
        .attr('y', (d) => {
            return d.y * (1 - LINK_TEXT_POSITION) + (d.parent.y + template.svgSettings.boxHeight) * LINK_TEXT_POSITION;
        })
        .classed('new-generation', (d) => d.data.attributes.newGeneration)
        .text(d => {
            if (d.data.attributes.newGeneration) {
                let parent = d.parent;
                let depth = 1;

                while (parent) {
                    if (parent.data.attributes.newGeneration) {
                        depth++;
                    }
                    parent = parent.parent;
                }

                return 'G' + depth;
            }
        });
}


export function elbow(template: Template): (d: NodeDatum) => string {
    return (d: NodeDatum): string => {
        return 'M' + d.x0 + ',' + d.y0 +
            'C' + d.x0 + ',' + (d.y0 + (d.parent.y + template.svgSettings.boxHeight)) / 2 +
            ' ' + d.parent.x + ',' + (d.y0 + (d.parent.y + template.svgSettings.boxHeight)) / 2 +
            ' ' + d.parent.x + ',' + (d.parent.y + template.svgSettings.boxHeight);
    }
}
