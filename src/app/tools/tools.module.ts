import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ToolsComponent } from './tools/tools.component';
import { RouterModule } from '@angular/router';
import { ToolContainerComponent } from './tool-container/tool-container.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolComponent } from './tool/tool.component';
import { GenMapperModule } from '../gen-mapper/gen-mapper.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToolNavListComponent } from './tool-nav-list/tool-nav-list.component';
import { ToolResolver } from './tool.resolver';

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
        ToolListComponent,
        ToolComponent,
        ToolNavListComponent
    ],
    providers: [
        ToolResolver
    ]
})
export class ToolsModule { }
