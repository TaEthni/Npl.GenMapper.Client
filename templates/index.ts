import { ChurchCirclesCzechTemplate } from './church-circles-czech/template';
import { ChurchCircles12Template } from './church-circles-12/template';
import { ChurchCirclesTemplate } from './church-circles/template';
import { DisciplesTemplate } from './disciples/template';
import { FourFieldsTemplate } from './four-fields/template';
import {
    GMField,
    GMReport,
    GMReportValue,
    GMSettings,
    GMStreamAttribute,
    GMSvg,
    GMSvgSet,
    GMTemplate,
    GMTemplateAttribute,
    GMTemplateReport,
} from './template.interface';
import { translations } from './translations';


const GenMapperTemplates = [
    ChurchCirclesTemplate,
    ChurchCirclesCzechTemplate,
    ChurchCircles12Template,
    FourFieldsTemplate,
    DisciplesTemplate,
    // MovementeerTemplate
];

GenMapperTemplates.forEach(processTemplate);

export {
    GenMapperTemplates,
    translations,
    GMTemplate,
    GMSvg,
    GMSettings,
    GMSvgSet,
    GMStreamAttribute,
    GMTemplateAttribute,
    GMField,
    GMReport,
    GMTemplateReport,
    GMReportValue
};

function processTemplate(template: GMTemplate): void {
    template.fields.forEach(field => {
        field.i18nRef = template.format + '.' + field.header;

        if (field.values) {
            field.values.forEach(value => {
                value.i18nRef = template.format + '.' + value.header;
            });
        }
    });
}
