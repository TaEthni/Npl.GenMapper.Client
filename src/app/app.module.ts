import { AdminModule } from '@admin/admin.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';

import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { AgmCoreModule } from '@agm/core';
import { ToolsModule } from './tools/tools.module';
import { GM_TEMPLATES, GM_CONFIGS } from './tools/gen-mapper/template.injecttoken';
import { GenMapperTemplates, GenMapperConfigs } from '@templates';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        LayoutModule,
        HomeModule,
        ToolsModule,
        AccountModule,
        AdminModule,
        AppRoutingModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://localhost:8000/api'],
                sendAccessToken: true
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
            libraries: ['places']
        })
    ],
    providers: [
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
