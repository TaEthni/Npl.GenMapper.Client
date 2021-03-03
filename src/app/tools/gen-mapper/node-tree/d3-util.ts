import { GMSvg } from '@npl-template';
import { Selection } from 'd3';

export function parseTransform(a: any): any {
    const b = {};
    let i;

    // tslint:disable-next-line:forin
    for (i in a = a.match(/(\w+\((-?\d+.?\d*e?-?\d*,?)+\))+/g)) {
        const c = a[i].match(/[\w.-]+/g);
        b[c.shift()] = c;
    }

    return b;
}

export function applySVGAttrsAndStyle(svg: GMSvg, element: Selection<any, any, any, any>): void {
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

export function applyAttributesToSvg(attributes: any, element: Selection<any, any, any, any>) {
    Object.keys(attributes).forEach((attribute) => {
        if (attribute === 'icon') {
            attribute = 'xlink:href';
        }

        element.attr(attribute, attributes[attribute]);
    });
}
