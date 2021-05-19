import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@npl-shared/shared.module';

import { GenMapperModule } from './gen-mapper/gen-mapper.module';
import { ToolsComponent } from './tools/tools.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        GenMapperModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
    ],
    declarations: [
        ToolsComponent,
    ],
    providers: [
    ]
})
export class ToolsModule { }
