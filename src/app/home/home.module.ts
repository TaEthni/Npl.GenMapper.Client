import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { GenMapComponent } from './gen-map/gen-map.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GenMapperModule } from '../gen-mapper/gen-mapper.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        GenMapperModule
    ],
    declarations: [
        LayoutComponent,
        GenMapComponent
    ]
})
export class HomeModule { }
