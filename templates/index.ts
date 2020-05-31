import { ChurchCircles12Configuration } from './church-circles-12/configuration-new';
import { ChurchCircles12Template } from './church-circles-12/template';
import { ChurchCirclesCzechConfiguration } from './church-circles-czech/configuration-new';
import { ChurchCirclesCzechTemplate } from './church-circles-czech/template';
import { ChurchCirclesConfiguration } from './church-circles/configuration-new';
import { ChurchCirclesDefaultTemplate } from './church-circles/template';
import { DisciplesTemplate } from './templates-v1/disciples/template';
import { FourFieldsTemplate } from './templates-v1/four-fields/template';
import { translations } from './translations';

export * from './countries';
export * from './template.interface';
export { GenMapperConfigs, GenMapperTemplates, translations, FourFieldsTemplate, DisciplesTemplate };

const GenMapperTemplates = [
    ChurchCirclesDefaultTemplate,
    ChurchCircles12Template,
    ChurchCirclesCzechTemplate,
    // ChurchCirclesEastTemplate,
];

const GenMapperConfigs = [
    ChurchCirclesConfiguration,
    ChurchCircles12Configuration,
    ChurchCirclesCzechConfiguration
    // ChurchCirclesEastConfiguration
];

export const GMTemplates = {
    ChurchCirclesDefaultTemplate,
    ChurchCircles12Template,
    ChurchCirclesCzechTemplate
}


// Remove
export interface GMStreamAttribute { }
