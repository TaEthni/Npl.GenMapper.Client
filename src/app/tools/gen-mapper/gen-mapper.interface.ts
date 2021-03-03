import { NodeDto } from '@npl-data-access';
import { HierarchyPointNode } from 'd3';

export interface GMGraphConfig {
    parentElement?: HTMLElement;
    outerHeaderHeight?: number;
}

export enum PrintType {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

export interface NodeDatum extends HierarchyPointNode<NodeDto> {
    isRoot: boolean;
    id: any;
    depth: number;
    class: string;
    name: string;
    x: number;
    x0: number;
    y: number;
    y0: number;
    tw?: number;
}
