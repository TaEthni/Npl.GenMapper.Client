import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GenMapperModule } from './gen-mapper/gen-mapper.module';
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
    declarations: [
        ToolsComponent,
    ],
    providers: [
    ]
})
export class ToolsModule { }
