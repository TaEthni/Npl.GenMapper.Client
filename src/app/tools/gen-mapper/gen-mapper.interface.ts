export interface GNode {
    id: string;
    name: string;
    parentId: string;

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
}

export interface GMGraphConfig {
    parentElement?: HTMLElement;
    outerHeaderHeight?: number;
}

export enum PrintType {
    horizontal = 'horizontal',
    vertical = 'vertical'
}
