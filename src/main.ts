import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as i18next from 'i18next';
import * as i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { defaultsDeep } from 'lodash';

import { AppModule } from './app/app.module';
import { ChurchCirclesTemplate } from './app/tools/gen-mapper/templates/church-circles';
import { FourFieldsTemplate } from './app/tools/gen-mapper/templates/four-fields';
import { translations } from './app/tools/gen-mapper/templates/translations';
import { environment } from './environments/environment';

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
