import i18next from 'i18next';

import { GMField, GMTemplate } from './gen-mapper.interface';

export namespace TemplateUtils {
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
}

