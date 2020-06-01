import { ChurchCircles12Configuration } from './church-circles-12/configuration-new';
import { ChurchCircles12Template } from './church-circles-12/template';
import { ChurchCirclesConfiguration } from './church-circles/configuration-new';
import { ChurchCirclesDefaultTemplate } from './church-circles/template';
import { translations } from './translations';
import { ChurchCirclesCzechConfiguration } from './church-circles-czech/configuration-new';
import { ChurchCirclesCzechTemplate } from './church-circles-czech/template';
export * from './countries';
export * from './template.interface';

export { GenMapperConfigs, GenMapperTemplates, translations };

const GenMapperTemplates = [
    ChurchCirclesDefaultTemplate,
    ChurchCircles12Template,
    ChurchCirclesCzechTemplate
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
