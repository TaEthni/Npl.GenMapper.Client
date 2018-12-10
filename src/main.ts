import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import i18next from 'i18next';
import * as i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { merge, defaultsDeep } from 'lodash';
import { FourFieldsTemplate } from './app/templates/four-fields';
import { ChurchCirclesTemplate } from './app/templates/church-circles';
import { translations } from './app/translations';

if (environment.production) {
    enableProdMode();
}

const resources = defaultsDeep(translations, defaultsDeep(ChurchCirclesTemplate.translations, FourFieldsTemplate.translations));

i18next
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: resources
    });

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
