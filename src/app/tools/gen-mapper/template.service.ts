import { GMTemplate, GenMapperConfigs } from '@templates';
import { Inject, Injectable } from '@angular/core';
import { GM_TEMPLATES } from './template.injecttoken';
import { Template } from './template.model';

const _cachedTemplates = {};
@Injectable({
    providedIn: 'root',
})
export class TemplateService {

    constructor(
        @Inject(GM_TEMPLATES) private gmTemplates: GMTemplate[],
    ) { }

    public getTemplates(): GMTemplate[] {
        return this.gmTemplates;
    }

    public getTemplate(templateId: string, configId?: string): Template {
        const id = templateId + configId;
        if (_cachedTemplates[id]) {
            return _cachedTemplates[id];
        }

        const gmTemplate = this.gmTemplates.find(t => t.id === templateId);
        const template = new Template(gmTemplate);

        configId = configId || template.defaultConfiguration;
        const config = GenMapperConfigs.find(c => c.id === configId);

        template.configure(config);
        _cachedTemplates[id] = template;
        return template;
    }
}

