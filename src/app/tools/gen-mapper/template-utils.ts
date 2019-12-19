import { ControlType, GenMapperTemplates, GMStreamAttribute, GMTemplate, translations } from '@templates';
import { csvFormatRows } from 'd3';
import { keyBy } from 'lodash';
import * as uuid from 'uuid/v4';
import { GNode } from './gen-mapper.interface';
import { Template } from './template.model';

export const GenMapperTemplatesByFormat = {};
GenMapperTemplates.forEach(t => (GenMapperTemplatesByFormat[t.id] = t));
GenMapperTemplates.forEach(template => {
    template.fieldsByKey = keyBy(template.fields, f => f.id);
});

const isNumberReg = /\d/;

export namespace TemplateUtils {
    export function outputEnglishTranslation(templateName: string): string {
        const template = getTemplate(templateName);
        const header = 'key,english,khmer' + '\n';
        const translation = translations.en.translation;
        const kn = translations.kn.translation;
        const data = [];

        Object.keys(translation).forEach(key => {
            if (
                key === 'disciples' ||
                key === 'churchCirclesCzech' ||
                key === 'fourFields'
            ) {
                return;
            }

            const value = translation[key];
            const knValue = kn[key];
            if (typeof value === 'string') {
                data.push([key, value, knValue]);
            } else if (typeof value === 'object') {
                Object.keys(value).forEach(k => {
                    const v = value[k];
                    const knv = knValue[k];
                    data.push([key + '.' + k, v, knv]);
                });
            }
        });

        return header + csvFormatRows(data);
    }

    export function getTemplate(templateName: string): GMTemplate {
        return (<any>GenMapperTemplatesByFormat)[templateName] as GMTemplate;
    }

    export function createCSVHeader(
        template: Template,
        attributes?: GMStreamAttribute[]
    ): string {
        const fields = template.fields.map(field => field.id);

        return fields.join(',') + '\n';
    }

    export function createInitialCSV(template: Template): string {
        return (
            createCSVHeader(template) +
            template.fields
                .map(field => {
                    // Patch to convert arrays to CSV readable values
                    // let v = getInitialTemplateValue(field, template);
                    let v = field.defaultValue;

                    if (field.id === 'id') {
                        v = uuid();
                    }

                    if (Array.isArray(v)) {
                        v = '\'' + v.join(', ') + '\'';
                    }
                    return v;
                })
                .join(',')
        );
    }

    export function setTemplateLocale(
        template: Template,
        locale: any
    ): void {
        template.svgs.forEach(svg => {
            if (svg.tooltipi18nRef) {
                svg.tooltipi18nValue = locale.t(svg.tooltipi18nRef);
            }
        });

        // Example: template.translations.en.translation.churchCircles;
        template.fields.forEach(field => {
            if (field.i18nRef) {
                field.i18nValue = locale.t(field.i18nRef);
            }

            if (field.options) {
                field.options.forEach(o => {
                    if (o.i18nRef) {
                        o.i18nValue = locale.t(o.i18nRef);
                    }
                });
            }
        });
    }

    export function getOutputCsv(
        data: GNode[],
        template: Template,
    ): string {
        const csvHeader = TemplateUtils.createCSVHeader(template);
        return (
            csvHeader +
            csvFormatRows(
                data.map((d, i) => {
                    const output = [];
                    const out = {};

                    // parsign checkboxes in CSV from 1&0 to true&false
                    template.fields.forEach(field => {
                        if (field && field.type === ControlType.checkbox) {
                            out[field.id] = d[field.id] ? '1' : '0';
                            output.push(out[field.id]);
                        } else if (field.type === ControlType.date) {
                            if (d[field.id]) {
                                out[field.id] = d[field.id].toString();
                                output.push(out[field.id]);
                            }
                        } else {
                            out[field.id] = d[field.id];
                            output.push(out[field.id]);
                        }
                    });

                    return output;
                })
            )
        );
    }

    export function getOutputAttributesJSON(
        attributes: GMStreamAttribute[]
    ): string {
        return JSON.stringify(attributes);
    }

}
