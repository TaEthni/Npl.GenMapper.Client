import { ChurchCircles12Configuration } from './church-circles-12/configuration-new';
import { ChurchCircles12Template } from './church-circles-12/template';
import { ChurchCirclesConfiguration } from './church-circles/configuration-new';
import { ChurchCirclesDefaultTemplate } from './church-circles/template';
import { translations } from './translations';
export * from './template.interface';
export { GenMapperConfigs, GenMapperTemplates, translations, };

const GenMapperTemplates = [
    ChurchCirclesDefaultTemplate,
    ChurchCircles12Template,
    // ChurchCirclesEastTemplate,
];

const GenMapperConfigs = [
    ChurchCirclesConfiguration,
    ChurchCircles12Configuration,
    // ChurchCirclesEastConfiguration
];


// Remove
export interface GMStreamAttribute { }
