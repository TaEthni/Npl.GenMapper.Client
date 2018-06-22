import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@core/authentication.guard';
import { ForbiddenComponent } from './home/forbidden/forbidden.component';
import { LayoutUnauthenticatedComponent } from './home/layout-unauthenticated/layout-unauthenticated.component';
import { LayoutComponent } from './home/layout/layout.component';
import { LoginComponent } from './home/login/login.component';
import { LogoutComponent } from './home/logout/logout.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { UnverifiedEmailComponent } from './home/unverified-email/unverified-email.component';
import { ChurchCirclesComponent } from './tools/church-circles/church-circles/church-circles.component';
import { ToolsComponent } from './tools/tools/tools.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tools',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutUnauthenticatedComponent,
        children: [{
            path: 'login',
            component: LoginComponent
        }, {
            path: 'logout',
            component: LogoutComponent
        }, {
            path: 'forbidden',
            component: ForbiddenComponent
        }, {
            path: 'unverified',
            component: UnverifiedEmailComponent
        }, {
            path: 'notfound',
            component: NotFoundComponent
        }]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: 'tools',
            component: ToolsComponent
        }, {
            path: 'church-circles',
            component: ChurchCirclesComponent
        }, {
            path: 'church-circles/:id',
            component: ChurchCirclesComponent
        }]
    },
    {
        path: '**',
        redirectTo: 'tools'
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
