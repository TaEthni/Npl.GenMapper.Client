interface Dictionary<T> {
    [index: string]: T;
}


export interface GMSvg {
    type: 'image' | 'text';
    attributes?: Dictionary<any>;
    style?: Dictionary<any>;
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
    value?: string;
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
    canModify: boolean;

    // Reference to the i18n key in the translations file.
    // Auto Mapped
    i18nRef?: string;

    type: string;
    initial?: any;
    initialTranslationCode?: string;
    localeLabel?: string;

    // SVG settings for the field
    svg?: GMSvg;

    // Reference to another svg settings within the template.
    inheritsFrom?: string;

    // The class name applied to the svg element
    class?: any;

    // Child values for the field.
    values?: any;

    // Experimental: Whether you can show/hide this field
    canModifyVisibility?: boolean;

    // The order in which the field will appear on the form.
    order?: number;

    // The order in which the column will appear on a csv export
    exportOrder?: number;

    // Reference to a header that has a type[check-box].
    // When the referenced field is false, this field will be displayed.
    dependsOnFalseField?: string;

    // Attributes to be applied to the inheritsFrom target.
    attributes?: Dictionary<Dictionary<any>>;
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
    icon?: string; // image for the reference in the navigation
    format: string;
    translations: any;
    settings: any;
    svg: any;
    fields: GMField[];
    reports?: GMReport[];
    templateReports?: GMTemplateReport[];
    defaultAttributes?: GMStreamAttribute[];

    // Manually Mapped
    fieldsByKey?: Dictionary<GMField>;
}
