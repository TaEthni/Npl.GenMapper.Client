import { GMTemplate, GenMapperConfigs, TemplateConfiguration } from '@templates';
import { Inject, Injectable } from '@angular/core';
import { GM_TEMPLATES, GM_CONFIGS } from './template.injecttoken';
import { Template } from './template.model';

const _cachedTemplates = {};
@Injectable({
    providedIn: 'root',
})
export class TemplateService {

    constructor(
        @Inject(GM_TEMPLATES) private gmTemplates: GMTemplate[],
        @Inject(GM_CONFIGS) private gmConfigs: TemplateConfiguration[],
    ) { }

    public getTemplates(): GMTemplate[] {
        return this.gmTemplates;
    }

    public getTemplate(templateId: string, configId?: string): Template {
        const gmTemplate = this.gmTemplates.find(t => t.id === templateId);

        configId = configId || gmTemplate.defaultConfiguration;
        const id = templateId + configId;

        if (_cachedTemplates[id]) {
            return _cachedTemplates[id];
        }

        const template = new Template(gmTemplate);
        const config = this.gmConfigs.find(c => c.id === configId);

        template.configure(config);
        _cachedTemplates[id] = template;
        return template;
    }
}

