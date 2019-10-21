import { GMTemplate, TemplateConfiguration, GMSvg, GMField } from "@templates";
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

        config.svgMap.forEach(map => {
            const svg = this._svgsById[map.svgRef];

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

            if (map.state) {
                svg.state = map.state;

                map.state.forEach(state => {
                    if (state.setIcon) {
                        state.fieldRefValues.forEach(v => {
                            v.iconRefValue = this.icons[v.iconRef];
                        });
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
