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
import { GM_TEMPLATES } from './tools/gen-mapper/template.injecttoken';
import { GenMapperTemplates } from '@templates';

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
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
            libraries: ['places']
        })
    ],
    providers: [
        {
            provide: GM_TEMPLATES,
            useValue: GenMapperTemplates
        }
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }
