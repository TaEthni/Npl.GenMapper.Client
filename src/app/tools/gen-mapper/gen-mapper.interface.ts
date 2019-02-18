import { Dictionary } from 'lodash';

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

export interface GMStreamAttribute {
    propertyName: string;
    type: string;
    value: string;
    isVisible?: boolean;
    icon?: string;
    isLabel?: boolean;
    order?: number;
    deprecated?: boolean;
}

export interface GMTemplateAttribute {
    propertyName: string;
    type: string;
    canHide: boolean;
    value: any;
    isVisible: boolean;
    isLabel?: boolean;
    order?: number;
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
    canModifyLabel: boolean;
    canModifyVisibility: boolean;
    order?: number;
}

export interface GMReport {
    name: string;
    label?: string;
    type?: 'boolean' | 'number' | 'radio' | 'multiSelect' | 'multiField' | 'multiNumber';

    // Mapped on client
    value?: number;
    values?: GMReportValue[];
    order?: number;
}

export interface GMTemplateReport {
    name: string;
    fields?: string[];
    field?: string;
    order: number;
    graph: 'pieChart' | 'pieGrid' | 'verticalBarChart';
}

export interface GMReportValue {
    // used for graph
    name: string;
    value?: number;

    // used for mapping
    key: string;
    option?: string;
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
    templateReports: GMTemplateReport[];
    defaultAttributes: GMStreamAttribute[];

    // Manually Mapped
    fieldsByKey: Dictionary<GMField>;
}

export interface GMGraphConfig {
    parentElement?: HTMLElement;
    outerHeaderHeight?: number;
}

export enum PrintType {
    horizontal = 'horizontal',
    vertical = 'vertical'
}
