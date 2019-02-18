import { csvFormatRows, csvParse } from 'd3';
import i18next from 'i18next';
import { assign, keyBy } from 'lodash';

import { GMField, GMStreamAttribute, GMTemplate, GNode } from './gen-mapper.interface';
import { ChurchCirclesTemplate } from './templates/church-circles';
import { ChurchCirclesCzechTemplate } from './templates/church-circles-czech';
import { DisciplesTemplate } from './templates/disciples';
import { FourFieldsTemplate } from './templates/four-fields';

export const GenMapperTemplates = [
    ChurchCirclesTemplate,
    ChurchCirclesCzechTemplate,
    DisciplesTemplate,
    FourFieldsTemplate,
];

export const GenMapperTemplatesByFormat = {};
GenMapperTemplates.forEach(t => GenMapperTemplatesByFormat[t.format] = t);
GenMapperTemplates.forEach(template => {
    template['fieldsByKey'] = keyBy(template.fields, (f) => f['header']);
});

const isNumberReg = /\d/;

export namespace TemplateUtils {
    export function getTemplate(templateName: string): GMTemplate {
        return (<any>GenMapperTemplatesByFormat)[templateName] as GMTemplate;
    }

    export function createCSVHeader(template: GMTemplate, attributes?: GMStreamAttribute[]): string {
        const fields = template.fields.map(field => field.header);

        if (attributes) {
            attributes
                .filter(a => !template.fieldsByKey[a.propertyName])
                .forEach(a => fields.push(a.propertyName));
        }

        return fields.join(',') + '\n';
    }

    export function createInitialCSV(template: GMTemplate): string {
        return createCSVHeader(template) + template.fields.map(field => {
            // Patch to convert arrays to CSV readable values
            let v = getInitialTemplateValue(field, template);

            if (Array.isArray(v)) {
                v = '"' + v.join(',') + '"';
            }
            return v;
        }).join(',');
    }

    export function setTemplateLocale(template: GMTemplate, locale: string): void {
        // Example: template.translations.en.translation.churchCircles;
        const translations = template.translations[locale].translation[template.format];

        template.fields.forEach(field => {
            if (translations[field.header]) {
                field.localeLabel = i18next.t(template.format + '.' + field.header);
                if (field.values) {
                    field.values.forEach((v: any) => {
                        v.localeLabel = i18next.t(template.format + '.' + v.header);
                    });
                }
            }
        });
    }

    export function getInitialTemplateValue(field: GMField, template: GMTemplate): any {
        if (field.initialTranslationCode) {
            return i18next.t(template.format + '.' + field.initialTranslationCode);
        } else {
            return field.initial;
        }
    }

    export function getOutputCsv(data: GNode[], templateName: string, attributes: GMStreamAttribute[]): string {
        const template = TemplateUtils.getTemplate(templateName);
        const csvHeader = TemplateUtils.createCSVHeader(template, attributes);

        return csvHeader + csvFormatRows(data.map((d, i) => {

            const output = [];
            const out = {};

            template.fields.forEach(field => {
                if (field && field.type === 'checkbox') {
                    out[field.header] = d[field.header] ? '1' : '0';
                    output.push(out[field.header]);
                } else {
                    out[field.header] = d[field.header];
                    output.push(d[field.header]);
                }
            });

            if (attributes) {
                attributes
                    .filter(a => !template.fieldsByKey[a.propertyName])
                    .forEach(a => output.push(d[a.propertyName]));
            }

            return output;
        }));
    }

    export function getOutputAttributesJSON(attributes: GMStreamAttribute[]): string {
        return JSON.stringify(attributes);
    }

    export function parseCsvData(csvData: string, templateName: string): GNode[] {
        return csvParse<GNode>(csvData, (d) => {
            const parsedId = parseFloat(d.id);
            if (parsedId < 0 || isNaN(parsedId)) { throw new Error('Group id must be integer >= 0.'); }
            const parsedLine: any = {};
            parsedLine['id'] = parsedId;
            parsedLine['parentId'] = d.parentId !== '' ? parseFloat(d.parentId) : '';

            const template = TemplateUtils.getTemplate(templateName);

            Object.keys(d).forEach(key => {
                const field = template.fieldsByKey[key];
                if (field) {
                    if (field.type === 'checkbox') {
                        const fieldValue = d[key].toUpperCase();
                        parsedLine[key] = !!['TRUE', '1'].includes(fieldValue);
                        return;
                    }

                    if (field.type) {
                        if (field.header === 'latitude' || field.header === 'longitude') {
                            parsedLine[key] = parseFloat(d[key]);
                            return;
                        }
                    }
                }

                parsedLine[key] = d[key];
            });

            template.fields.forEach((field) => {
                if (!parsedLine.hasOwnProperty(field.header) && field.initial) {
                    if (field.type === 'checkbox') {
                        const fieldValue = d[field.header].toUpperCase();
                        parsedLine[field.header] = !!['TRUE', '1'].includes(fieldValue);
                    } else {
                        parsedLine[field.header] = field.initial;
                    }
                }
            });

            template.defaultAttributes.forEach(attr => {
                if (!parsedLine.hasOwnProperty(attr.propertyName)) {
                    //
                }
            });

            parsedLine.isRoot = !parsedLine.parentId && parsedLine.parentId !== 0;

            convertPropertyToArray(parsedLine, 'peopleGroups', true);
            convertPropertyToArray(parsedLine, 'peopleGroupsNames');

            // This is for old data.
            if (parsedLine.hasOwnProperty('threeThirds')) {
                if (typeof parsedLine.threeThirds === 'string') {
                    parsedLine.threeThirds = parsedLine.threeThirds.replace(/\W/, '');
                    parsedLine.threeThirds = parsedLine.threeThirds.split('');

                    const filtered = parsedLine.threeThirds.filter((key: any) => isNumberReg.test(key));
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

    export function parseAttributes(elementsData: string, templateName: string): GMStreamAttribute[] {
        let attrs;
        if (!elementsData) {
            attrs = getDefaultAttributesForTemplate(templateName);
        } else {
            attrs = JSON.parse(elementsData);
        }

        attrs.forEach(attr => {
            if (!attr.order && attr.order !== 0) {
                attr.order = 1000;
            }
        });
        attrs.sort((a, b) => a.order - b.order);
        return attrs;
    }
}

function convertPropertyToArray(parsedLine: any, property: string, isNumber?: boolean): void {
    if (parsedLine.hasOwnProperty(property)) {
        if (typeof parsedLine[property] === 'string') {
            parsedLine[property] = parsedLine[property].split(',');
            if (isNumber) {
                const result = [];
                parsedLine[property].forEach((num) => {
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

function getDefaultAttributesForTemplate(templateName: string): GMStreamAttribute[] {
    const template = TemplateUtils.getTemplate(templateName);
    const attrs = [];

    if (template.defaultAttributes) {
        template.defaultAttributes.forEach(a => {
            attrs.push(assign({
                value: i18next.t(template.format + '.' + a.propertyName)
            }, a));
        });
    }

    template.fields.forEach(field => {
        if (field.canModifyLabel) {
            attrs.push({
                propertyName: field.header,
                value: i18next.t(template.format + '.' + field.header),
                type: field.type,
                isVisible: true,
                order: field.order,
            });
        }
    });

    return attrs;
}
