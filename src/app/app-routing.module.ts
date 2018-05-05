import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './home/layout/layout.component';
import { GenMapComponent } from './home/gen-map/gen-map.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'gen-mapper',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {},
        data: {},
        children: [{
            path: 'gen-mapper',
            component: GenMapComponent
        }]
    },
    {
        path: '**',
        redirectTo: 'gen-mapper'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {
}
