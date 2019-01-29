
export interface GNode {
    id: string;
    parentId: string;

    active: boolean;
    inactiveReason: string;

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

export interface GMTemplate {
    name: string;
    title: string;
    version: string;
    format: string;
    translations: any;
    settings: any;
    svg: any;
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