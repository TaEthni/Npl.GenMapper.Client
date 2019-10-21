import { ChurchCirclesDefaultTemplate } from './church-circles/template';
export * from './template.interface';
import { ChurchCirclesWorldTemplate } from './church-circles-world/template';
import { GenMapperWorldConfiguration } from './church-circles-world/configuration';
import { ChurchCirclesConfiguration } from './church-circles/configuration';
import { translations } from './translations';
import { ChurchCircles12Configuration } from './church-circles-12/configuration';
import { ChurchCircles12Template } from './church-circles-12/template';

const GenMapperTemplates = [
    ChurchCirclesDefaultTemplate,
    ChurchCirclesWorldTemplate,
    ChurchCircles12Template
];

const GenMapperConfigs = [
    ChurchCirclesConfiguration,
    GenMapperWorldConfiguration,
    ChurchCircles12Configuration
];

export {
    GenMapperConfigs,
    GenMapperTemplates,
    translations,
};

// Remove
export interface GMStreamAttribute { }
