import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Browser } from '@npl-core/browser';
import { Device } from '@npl-core/platform';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .then((ref) => {
        // Ensure Angular destroys itself on hot reloads.
        Device.setClassList(document.documentElement);
        Browser.setClassList(document.documentElement);
    })
    .catch(err => console.log(err));
