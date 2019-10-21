import { GenMapperTemplates, GMField, GMStreamAttribute, GMTemplate, translations, ControlType } from '@templates';
import { csvFormatRows, csvParse, local } from 'd3';
import i18next from 'i18next';
import { assign, keyBy } from 'lodash';
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

        // if (attributes) {
        //     attributes
        //         .filter(a => !template.fieldsByKey[a.propertyName])
        //         .forEach(a => fields.push(a.propertyName));
        // }

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
        template: GMTemplate,
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

    export function getInitialTemplateValue(
        field: GMField,
        template: GMTemplate
    ): any {
        // if (field.initialTranslationCode) {
        //     return i18next.t(
        //         template.format + '.' + field.initialTranslationCode
        //     );
        // } else {
        //     return field.initial;
        // }
    }

    export function getOutputCsv(
        data: GNode[],
        template: Template,
        attributes?: GMStreamAttribute[]
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
                        } else {
                            out[field.id] = d[field.id];
                            output.push(d[field.id]);
                        }
                    });

                    // if (attributes) {
                    //     attributes
                    //         .filter(a => !template.fieldsByKey[a.propertyName])
                    //         .forEach(a => output.push(d[a.propertyName]));
                    // }

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

    export function parseCsvData(csvData: string, templateName: string): GNode[] {
        return csvParse<GNode>(csvData, row => {

            // const parsedId = parseFloat(row.id);
            // if (parsedId < 0 || isNaN(parsedId)) {
            //     throw new Error('Group id must be integer >= 0.');
            // }


            const parsedLine: any = {};
            parsedLine['id'] = row.id;
            parsedLine['parentId'] =
                row.parentId !== '' ? parseFloat(row.parentId) : '';

            const template = TemplateUtils.getTemplate(templateName);

            Object.keys(row).forEach(key => {
                const field = template.fieldsByKey[key];
                if (field) {
                    if (field.type === ControlType.checkbox) {
                        if (row[key]) {
                            const fieldValue = row[key].toUpperCase();
                            parsedLine[key] = !!['TRUE', '1'].includes(
                                fieldValue
                            );
                        } else {
                            parsedLine[key] = false;
                        }
                        return;
                    }

                    if (field.parseValueAsInt) {
                        parsedLine[key] = parseInt(row[key]) || null;
                    }

                    if (field.parseOptionValueAsInt) {
                        if (row[key] && Array.isArray(row[key])) {
                            const v: string[] = row[key] as any;
                            parsedLine[key] = v.map(value => parseInt(value));
                        }
                    }
                }

                parsedLine[key] = row[key];
            });

            // Iterate Fields and set defaultValue if the property has not been set
            template.fields.forEach(field => {
                if (!parsedLine.hasOwnProperty(field.id) && field.defaultValue) {
                    if (field.type === ControlType.checkbox) {
                        const fieldValue = row[field.id].toUpperCase();
                        parsedLine[field.id] = !!['TRUE', '1'].includes(
                            fieldValue
                        );
                    } else {
                        parsedLine[field.id] = field.defaultValue;
                    }
                }
            });

            // template.defaultAttributes.forEach(attr => {
            //     if (!parsedLine.hasOwnProperty(attr.propertyName)) {
            //         //
            //     }
            // });

            parsedLine.isRoot =
                !parsedLine.parentId && parsedLine.parentId !== 0;

            // TODO: remove
            convertPropertyToArray(parsedLine, 'peopleGroups', true);
            // TODO: remove
            convertPropertyToArray(parsedLine, 'peopleGroupsNames');

            // This is for CSV files coming from the old-gen-mapper v1
            // when the threeThirds value was a string '1234567'
            // converts '1234567' to [1,2,3,4,5,6,7]
            if (parsedLine.hasOwnProperty('threeThirds')) {
                if (typeof parsedLine.threeThirds === 'string') {
                    parsedLine.threeThirds = parsedLine.threeThirds.replace(
                        /\W/,
                        ''
                    );
                    parsedLine.threeThirds = parsedLine.threeThirds.split('');

                    const filtered = parsedLine.threeThirds.filter((key: any) =>
                        isNumberReg.test(key)
                    );
                    const value: any = [];

                    // dedupe old data
                    filtered.forEach((a: any) => {
                        if (!value.includes(a)) {
                            value.push(a);
                        }
                    });

                    parsedLine.threeThirds = value;
                }
            }

            return parsedLine as GNode;
        });
    }

    // export function parseAttributes(
    //     elementsData: string,
    //     templateName: string
    // ): GMStreamAttribute[] {
    //     let attrs;
    //     if (!elementsData) {
    //         attrs = getDefaultAttributesForTemplate(templateName);
    //     } else {
    //         attrs = JSON.parse(elementsData);
    //     }

    //     attrs.forEach(attr => {
    //         if (!attr.order && attr.order !== 0) {
    //             attr.order = 1000;
    //         }
    //     });

    //     attrs.sort((a, b) => a.order - b.order);
    //     return attrs;
    // }
}

function convertPropertyToArray(
    parsedLine: any,
    property: string,
    isNumber?: boolean
): void {
    if (parsedLine.hasOwnProperty(property)) {
        if (typeof parsedLine[property] === 'string') {
            parsedLine[property] = parsedLine[property].split(',');
            if (isNumber) {
                const result = [];
                parsedLine[property].forEach(num => {
                    num = parseFloat(num);
                    if (num) {
                        result.push(num);
                    }
                });
                parsedLine[property] = result;
            }
        }
    }
}

// function getDefaultAttributesForTemplate(
//     templateName: string
// ): GMStreamAttribute[] {
//     const template = TemplateUtils.getTemplate(templateName);
//     const attrs = [];

//     console.log(i18next.t('churchCircles.name'));
//     if (template.defaultAttributes) {
//         template.defaultAttributes.forEach(a => {
//             attrs.push(
//                 assign(
//                     {
//                         value: i18next.t(template.format + '.' + a.propertyName)
//                     },
//                     a
//                 )
//             );
//         });
//     }

//     template.fields.forEach(field => {
//         if (field.canModify) {
//             attrs.push({
//                 propertyName: field.header,
//                 value: i18next.t(template.format + '.' + field.header),
//                 type: field.type,
//                 isVisible: true,
//                 order: field.order
//             });
//         }
//     });

//     return attrs;
// }
