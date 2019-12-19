interface Dictionary<T> {
    [index: string]: T;
}

export enum ControlType {
    text = 'text',
    number = 'number',
    textarea = 'textarea',
    checkbox = 'checkbox',
    geoLocation = 'geoLocation',
    hidden = 'hidden',
    radio = 'radio',
    select = 'select',
    multiSelect = 'multiSelect',
    date = 'date',

    // Internal
    parentSelector = 'parentSelector',
    none = 'none'
}

export interface TemplateConfiguration {
    id: string;
    fields: GMField[];
    icons: { [key: string]: string };
    svgStates?: any;
    svgMap?: {
        svgRef?: string;
        iconRef?: string;
        tooltipFieldRef?: string;
        state?: GMFieldState[];
        rules?: any[];
        attributes?: any;
        style?: any;
    }[];
}

export class GMTemplate {
    // Primary Identifier
    id?: string;

    // Css Class theme to use
    theme?: string;

    // English readable name
    name?: string;

    // Translation Key for name
    i18nName?: string;

    // Default Configuration Id
    defaultConfiguration?: string;

    // Settings applied to the template as a whole
    settings?: GMTemplateSettings;

    svgSettings?: GMTemplateSvgSettings;

    svgs?: GMSvg[];
    svgActions?: GMSvgAction[];

    reports?: any;
    templateReports?: any;
    translations?: any;

    // Set By Client
    fields?: GMField[];

    // Set By Client
    fieldsByKey?: Dictionary<GMField>;

    // Set by Client
    icons?: { [key: string]: string };

    svgStates?: Dictionary<Svg>;
}

export interface GMTemplateSettings {
    // Icon used on home screen
    iconUrl: string;
}

export interface GMTemplateSvgSettings {
    // default text height
    textHeight: number;

    // height of node bounds
    boxHeight: number;

    // Width & height of element icons
    iconSize: number;

    // x & y of nodeActions group
    nodeActions: {
        x: number;
        y: number;
        height: number;
        width: number;
    };

    // Bounds
    nodeBounds: {
        width: number;
        height: number;
    };

    nodeWidth: number;
    nodeHeight: number;
}

export interface GMField {
    // Primary Identifier
    id: string;

    // i18n key for displaying the field label
    i18nRef?: string;
    i18nValue?: string; // mapped on client

    i18nDescriptionRef?: string;
    i18nDescriptionValue?: string;

    // Default value for the control
    defaultValue?: any;

    // The form control type
    type?: ControlType;

    // The order of the form control in the UI
    controlOrder?: number;

    // Child values for the field.
    options?: GMFieldOption[];

    // Whether it can be modified
    canModify: boolean;

    // List of fields to apply add up for this value
    sumOfFields?: string[];

    // Option will convert incoming option values of '1' to 1
    parseOptionValueAsInt?: boolean;

    // Option will convert incoming value to an int
    parseValueAsInt?: boolean;

    // Option will convert incoming value to an float
    parseValueAsFloat?: boolean;

    // Appears in UI only when property of the referenced field is false
    dependsOnFalseField?: string;

    // Appears in UI only when property of the referenced field is true
    dependsOnTrueField?: string;

    // Appears in UI only when property of the referenced field is false
    dependsOnFieldId?: string;
    dependsOnFieldValue?: any;

    // Ref to the icons
    iconRef?: string;

    // actual Icon url // mapped on client
    iconRefValue?: string;

    // Whether the text value of this field is displayed as a label on the GenMap
    isNodeSvgLabel?: boolean;

    // The order of the label on the GenMap
    nodeSvgLabelOrder?: number;

    deprecated?: boolean;

    // Whether the field is required or not
    nullable?: boolean;
}

export interface GMFieldOption {
    // Value of the Option
    value: any;

    // i18n reference to the option label
    i18nRef?: string;
    i18nValue?: string; // mapped on client

    // attributes to apply to the node when option is selected
    nodeSvg?: Svg;

    svgRefClass?: string;

    svgRefAttributes?: {};

    svgRefOptions?: Svg;

    // Whether the option is an other option or not.
    // Used to display a text field to input other option
    isOther?: boolean;
}

export interface Svg {
    id?: string;
    type?: 'image' | 'text' | 'rect' | 'circle';
    attributes?: Dictionary<any>;
    style?: Dictionary<any>;
    class?: string;
    tooltipi18nRef?: string;
    tooltipi18nValue?: string;
}

export interface GMSvg extends Svg {
    // used by gn-map to select the node to apply he svg props to
    target?: string;

    // Reference to template icons
    iconRef?: string;
    // Actual icon set by client
    iconRefValue?: string;

    state?: GMFieldState[];

    rules?: any[];

    states?: any[];
}

export interface GMSvgAction extends Svg {
    control: 'addChildNode' | 'editNode';
    iconName: string;
    rect?: Svg;
}

export interface GMFieldState {
    attr?: string;
    style?: string;
    setText?: boolean,
    setIcon?: boolean,
    fieldRef?: string;
    fieldRefValues?: {
        value?: any;
        attrValue?: any;
        styleValue?: any;
        iconRef?: string;
        iconRefValue?: string;
    }[]
}

export interface SvgState extends Svg {
    fieldValue?: any;
    fieldRef?: string;
}

export interface GMReport {
    name: string;
    label?: string;
    type?: 'boolean' | 'number' | 'radio' | 'multiSelect' | 'multiField' | 'multiNumber';

    // Mapped on client
    value?: number;
    values?: GMReportValue[];
    order?: number;
    i18nRef?: string;
}


export interface GMReportValue {
    // used for graph
    name: string;
    value?: number;

    // used for mapping
    key: string;
    option?: string;
}

export interface GMTemplateReport {
    name: string;
    fields?: string[];
    field?: string;
    order: number;
    graph: 'pieChart' | 'pieGrid' | 'verticalBarChart';
}

