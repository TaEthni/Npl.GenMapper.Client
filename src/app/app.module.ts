import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminModule } from '@npl-admin/admin.module';
import { AuthModule } from '@npl-auth';
import { CoreModule } from '@npl-core/core.module';
import { RouterSerializer } from '@npl-core/RouterSerializer';
import { API_BASE_URL, appEffects, appReducers } from '@npl-data-access';
import { IDP_BASE_URL } from '@npl-idp';
import { GenMapperConfigs, GenMapperTemplates } from '@npl-template';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GM_CONFIGS, GM_TEMPLATES } from './core/template.injecttoken';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { ToolsModule } from './tools/tools.module';
import { UpdatesModule } from './updates/updates.module';
import esriConfig from '@arcgis/core/config';

esriConfig.apiKey = environment.arcgisConfig.apiKey;

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
        HomeModule,
        ToolsModule,
        AdminModule,
        UpdatesModule,
        AppRoutingModule,
        AuthModule.forRoot(environment.authConfig),
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            name: 'APM Demo App DevTools',
            maxAge: 25,
            logOnly: environment.production,
        }),
        StoreRouterConnectingModule.forRoot({
            serializer: RouterSerializer,
        }),
        EffectsModule.forRoot(appEffects),
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        {
            provide: API_BASE_URL,
            useValue: environment.apiBase,
        },
        {
            provide: IDP_BASE_URL,
            useValue: environment.authConfig.authority + '/api/',
        },
        {
            provide: GM_TEMPLATES,
            useValue: GenMapperTemplates,
        },
        {
            provide: GM_CONFIGS,
            useValue: GenMapperConfigs,
        },
    ],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {}
