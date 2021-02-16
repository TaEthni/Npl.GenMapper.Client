import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdminModule } from '@npl-admin/admin.module';
import { AuthModule } from '@npl-auth';
import { CoreModule } from '@npl-core/core.module';
import { RouterSerializer } from '@npl-core/RouterSerializer';
import { IDP_BASE_URL } from '@npl-idp';
import { GenMapperConfigs, GenMapperTemplates } from '@npl-template';

import { environment } from '../environments/environment';
import { AccountV1Module } from './account-v1/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GM_CONFIGS, GM_TEMPLATES } from './core/template.injecttoken';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { appEffects, appReducers } from './store/state';
import { ToolsModule } from './tools/tools.module';
import { UpdatesModule } from './updates/updates.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
        HomeModule,
        ToolsModule,
        AccountV1Module,
        AdminModule,
        UpdatesModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.apiKey,
            libraries: ['places']
        }),
        AuthModule.forRoot(environment.authConfig),
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            name: 'APM Demo App DevTools',
            maxAge: 25,
            logOnly: environment.production
        }),
        StoreRouterConnectingModule.forRoot({
            serializer: RouterSerializer
        }),
        EffectsModule.forRoot(appEffects)
    ],
    providers: [
        {
            provide: IDP_BASE_URL,
            useValue: environment.authConfig.authority + '/api/'
        },
        {
            provide: GM_TEMPLATES,
            useValue: GenMapperTemplates
        },
        {
            provide: GM_CONFIGS,
            useValue: GenMapperConfigs
        }
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }
