import { NodeDatum } from "../gen-mapper.interface";
import { Selection } from 'd3';
import { Template } from "../template.model";

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
        .merge(link)
        .attr('class', 'link')
        .attr('d', elbow(template));

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
            return d.y * (1 - LINK_TEXT_POSITION) + (d.parent.y + template.svgSettings.boxHeight) * LINK_TEXT_POSITION;
        })
        .classed('new-generation', (d) => d.data.newGeneration)
        .text(d => {
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
}


function elbow(template: Template): (d: NodeDatum) => string {
    return (d: NodeDatum): string => {
        return 'M' + d.x + ',' + d.y +
            'C' + d.x + ',' + (d.y + (d.parent.y + template.svgSettings.boxHeight)) / 2 +
            ' ' + d.parent.x + ',' + (d.y + (d.parent.y + template.svgSettings.boxHeight)) / 2 +
            ' ' + d.parent.x + ',' + (d.parent.y + template.svgSettings.boxHeight);
    }
}
