import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

const accountRoutes: Routes = [
    {
        path: '',
        component: DetailComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            accountRoutes
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AccountRoutingModule {
}
