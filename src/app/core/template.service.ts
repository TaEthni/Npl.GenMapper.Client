import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Template } from '@npl-data-access';
import { GMField, GMTemplate, TemplateConfiguration } from '@npl-template';

import { GM_CONFIGS, GM_TEMPLATES } from './template.injecttoken';

@Injectable({
    providedIn: 'root',
})
export class TemplateService {
    private localeId: string;
    private templates: Template[] = [];
    private templatesById: { [key: string]: Template } = {};

    constructor(
        @Inject(GM_TEMPLATES) private gmTemplates: GMTemplate[],
        @Inject(GM_CONFIGS) private gmConfigs: TemplateConfiguration[],
        private translate: TranslateService
    ) {
        this.configure();
        this.localeId = this.translate.currentLang;

        this.localizeTemplates();

        this.translate.onLangChange.subscribe(event => {
            this.localeId = event.lang;
            this.localizeTemplates();
        });

        // this.locale.get().subscribe(result => {
        //     if (result && result !== this.localeId) {
        //         this.localeId = result;
        //         this.localizeTemplates();
        //     }
        // });
    }

    public configure(): void {
        this.gmTemplates.forEach(template => this.getTemplate(template.id));
    }

    public getTemplates(): Template[] {
        return this.templates;
    }

    public getTemplate(templateId: string, configId?: string): Template {
        const gmTemplate = this.gmTemplates.find(t => t.id === templateId);

        if (!gmTemplate) {
            return null;
        }

        configId = configId || gmTemplate.defaultConfiguration;
        const id = templateId + configId;

        if (this.templatesById[id]) {
            return this.templatesById[id];
        }

        const template = new Template(gmTemplate);
        const config = this.gmConfigs.find(c => c.id === configId);

        template.configure(config);
        this.templatesById[id] = template;
        this.templates.push(template);
        return template;
    }

    private localizeTemplates(): void {
        this.templates.forEach(template => {
            template.svgs.forEach(svg => {
                if (svg.tooltipi18nRef) {
                    svg.tooltipi18nValue = this.translate.instant(svg.tooltipi18nRef);
                }
            });

            template.svgActions.forEach(action => {
                action.tooltipi18nValue = this.translate.instant(action.tooltipi18nRef);
            });

            // Example: template.translations.en.translation.churchCircles;
            this.localizeFields(template.fields);
        });
    }

    private localizeFields(fields: GMField[]): void {
        fields.forEach(field => {
            if (field.i18nRef) {
                field.i18nValue = this.translate.instant(field.i18nRef);
            }

            if (field.options) {
                field.options.forEach(o => {
                    if (o.i18nRef) {
                        o.i18nValue = this.translate.instant(o.i18nRef);
                    }
                });
            }

            if (field.fields) {
                this.localizeFields(field.fields);
            }
        });
    }
}

