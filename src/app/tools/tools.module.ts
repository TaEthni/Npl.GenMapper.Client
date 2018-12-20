import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { GenMapperModule } from '../gen-mapper/gen-mapper.module';
import { ToolContainerComponent } from './tool-container/tool-container.component';
import { ToolNavListComponent } from './tool-nav-list/tool-nav-list.component';
import { ToolOfflineComponent } from './tool-offline/tool-offline.component';
import { ToolResolver } from './tool.resolver';
import { ToolComponent } from './tool/tool.component';
import { ToolsComponent } from './tools/tools.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        GenMapperModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        ToolNavListComponent
    ],
    declarations: [
        ToolsComponent,
        ToolContainerComponent,
        ToolComponent,
        ToolNavListComponent,
        ToolOfflineComponent
    ],
    providers: [
        ToolResolver
    ]
})
export class ToolsModule { }
