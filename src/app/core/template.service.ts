import { Inject, Injectable } from '@angular/core';
import { Template } from '@models/template.model';
import { GMTemplate, TemplateConfiguration } from '@templates';
import { GM_CONFIGS, GM_TEMPLATES } from './template.injecttoken';

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

        if (!gmTemplate) {
            return null;
        }

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

