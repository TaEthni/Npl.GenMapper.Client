

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Browser } from '@npl-core/browser';
import { Device } from '@npl-core/platform';
import i18next from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { defaultsDeep } from 'lodash';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { GenMapperTemplates, translations } from './templates';

if (environment.production) {
    enableProdMode();
}

let resources = translations;

GenMapperTemplates
    .map(template => template.translations)
    .forEach(translation => {
        resources = defaultsDeep(resources, translation);
    });

i18next
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: resources
    });

platformBrowserDynamic().bootstrapModule(AppModule)
    .then((ref) => {
        // Ensure Angular destroys itself on hot reloads.
        if (window['ngRef']) {
            window['ngRef'].destroy();
        }
        window['ngRef'] = ref;
        Device.setClassList(document.documentElement);
        Browser.setClassList(document.documentElement);
    })
    .catch(err => console.log(err));
