import { AdminModule } from '@admin/admin.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';

import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { ToolsModule } from './tools/tools.module';

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
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }
