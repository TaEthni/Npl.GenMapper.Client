import { csvFormatRows, csvParse } from 'd3';
import i18next from 'i18next';

import { GMField, GMTemplate, GNode } from './gen-mapper.interface';
import { ChurchCirclesTemplate } from './templates/church-circles';
import { FourFieldsTemplate } from './templates/four-fields';

export const genMapperTemplates = {
    [ChurchCirclesTemplate.format]: ChurchCirclesTemplate,
    [FourFieldsTemplate.format]: FourFieldsTemplate
};

export namespace TemplateUtils {
    export function getTemplate(templateName: string): GMTemplate {
        return genMapperTemplates[templateName] as GMTemplate;
    }

    export function createCSVHeader(template: GMTemplate): string {
        return template.fields.map(field => field.header).join(',') + '\n';
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

    export function getInitialTemplateValue(field: GMField, template: GMTemplate): any {
        if (field.initialTranslationCode) {
            return i18next.t(template.format + '.' + field.initialTranslationCode);
        } else {
            return field.initial;
        }
    }

    export function getOutputCsv(data: GNode[], templateName: string): string {
        const template = TemplateUtils.getTemplate(templateName);
        const csvHeader = TemplateUtils.createCSVHeader(template);
        return csvHeader + csvFormatRows(data.map((d, i) => {
            const output = [];
            template.fields.forEach((field) => {
                if (field.type === 'checkbox') {
                    output.push(d[field.header] ? '1' : '0');
                } else {
                    output.push(d[field.header]);
                }
            });
            return output;
        }));
    }

    export function parseCsvData(csvData: string, templateName: string): GNode[] {
        return csvParse<GNode>(csvData, (d) => {
            const parsedId = parseFloat(d.id);
            if (parsedId < 0 || isNaN(parsedId)) { throw new Error('Group id must be integer >= 0.'); }
            const parsedLine = {};
            parsedLine['id'] = parsedId;
            parsedLine['parentId'] = d.parentId !== '' ? parseFloat(d.parentId) : '';

            const template = TemplateUtils.getTemplate(templateName);
            template.fields.forEach((field) => {
                if (field.type === 'checkbox') {
                    const fieldValue = d[field.header].toUpperCase();
                    parsedLine[field.header] = !!['TRUE', '1'].includes(fieldValue);
                } else if (field.type) {
                    parsedLine[field.header] = d[field.header];
                }
            });
            return parsedLine as GNode;
        });
    }
}

