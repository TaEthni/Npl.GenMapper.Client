import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GenMapperContainerComponent } from './gen-mapper-container/gen-mapper-container.component';
import { GMTemplateNames } from '@shared/GMTemplates';
import { ChurchCirclesComponent } from './church-circles/church-circles.component';

const genMapperRoutes: Routes = [
    {
        path: '',
        component: GenMapperContainerComponent,
        children: [{
            path: GMTemplateNames.churchCircles,
            component: ChurchCirclesComponent,
        }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(genMapperRoutes)
    ],
    providers: [

    ],
    exports: [
        RouterModule
    ]
})
export class GenMapperRoutingModule { }
