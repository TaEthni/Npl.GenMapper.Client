import { HierarchyPointNode } from "d3";

export interface GNode {
    id: string;
    name: string;
    parentId: any;
    isRoot?: boolean;

    active: boolean;
    inactiveReason: string;
    newGeneration?: boolean;

    // Optional Properties
    location?: string;
    latitude?: number;
    longitude?: number;
    placeId?: string;
    leaderName?: string;
    leadersName?: string;

    // Mapped on client
    gen: number;

    // Only set on node click from d3 node.descendants();
    descendants?: GNode[];
    hasChildNodes?: boolean;

    threeThirds?: any;
}

export interface GMGraphConfig {
    parentElement?: HTMLElement;
    outerHeaderHeight?: number;
}

export enum PrintType {
    horizontal = 'horizontal',
    vertical = 'vertical'
}


export interface NodeDatum extends HierarchyPointNode<GNode> {

}
