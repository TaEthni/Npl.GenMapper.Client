import { GMField, GMSvg, GMTemplate, TemplateConfiguration } from "@templates";
import { cloneDeep, Dictionary, keyBy } from "lodash";

export class Template extends GMTemplate {
    private _svgsById: Dictionary<GMSvg>;
    private _fieldsById: Dictionary<GMField>;

    constructor(template: GMTemplate) {
        super();

        template = cloneDeep(template);
        Object.assign(this, template);
        this._svgsById = keyBy(this.svgs, (s) => s.id);
    }

    configure(config: TemplateConfiguration): any {
        this.icons = config.icons;
        this.fields = config.fields;
        this._fieldsById = keyBy(this.fields, (f) => f.id);

        this.svgStates = config.svgStates;

        config.svgStates.forEach(map => {
            const svg = this._svgsById[map.selector];

            if (map.attributes) {
                Object.assign(svg.attributes, map.attributes);
            }

            if (map.style) {
                Object.assign(svg.style, map.style);
            }

            if (map.iconRef) {
                svg.attributes['xlink:href'] = this.icons[map.iconRef];
            }

            if (map.tooltipFieldRef) {
                const field = this.getField(map.tooltipFieldRef);
                svg.tooltipi18nRef = field.i18nRef;
            }

            if (map.states) {
                svg.states = map.states;

                svg.states.forEach(state => {
                    if (state.setIcon) {
                        state.svg = state.svg || {};
                        state.svg.attributes = state.svg.attributes || {};
                        state.svg.attributes['xlink:href'] = this.icons[state.iconRef];
                    }
                })
            }
        });

        this.fields.forEach(field => {
            if (field.iconRef) {
                field.iconRefValue = this.icons[field.iconRef];
            }
        });
    }

    public getField(fieldId: string) {
        return this._fieldsById[fieldId];
    }

    public getSvg(svgId: string) {
        return this._svgsById[svgId];
    }
}
