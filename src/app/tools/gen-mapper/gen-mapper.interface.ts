
export interface GNode {
    id: string;
    name: string;
    parentId: string;

    active: boolean;
    inactiveReason: string;

    // Optional Properties
    location?: string;
    latitude?: number;
    longitude?: number;
    placeId?: string;
    leaderName?: string;
    leadersName?: string;

    // Only set on node click from d3 node.descendants();
    descendants?: GNode[];
}

export interface GMSvg {
    type: string;
    attribute: any;
    style?: any;
}

export interface GMSettings {
    nodeSize: { width: number, height: number };
}

export interface GMSvgSet {
    [key: string]: GMSvg;
}

export interface GMField {
    header: string;
    initial: number;
    initialTranslationCode?: string;
    localeLabel?: string;
    type: string;
    svg?: GMSvgSet;
    inheritsFrom?: string;
    class?: any;
    values?: any;
}

export interface GMReport {
    name: string;
    type: 'boolean' | 'number';

    // Mapped on client
    value: number;
}

export interface GMTemplate {
    name: string;
    title: string;
    version: string;
    format: string;
    translations: any;
    settings: any;
    svg: any;
    reports: GMReport[];
    fields: GMField[];
}

export interface GMGraphConfig {
    parentElement?: HTMLElement;
    outerHeaderHeight?: number;
}


export enum PrintType {
    horizontal = 'horizontal',
    vertical = 'vertical'
}
