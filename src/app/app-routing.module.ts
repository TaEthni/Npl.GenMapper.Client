import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from '@core/user.resolver';

import { DetailComponent } from './account/detail/detail.component';
import { ConfirmEmailComponent } from './home/confirm-email/confirm-email.component';
import { ForbiddenComponent } from './home/forbidden/forbidden.component';
import { LoginComponent } from './home/login/login.component';
import { LogoutComponent } from './home/logout/logout.component';
import { MaintenanceComponent } from './home/maintenance/maintenance.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { RecoverPasswordComponent } from './home/recover-password/recover-password.component';
import { ResetPasswordExpiredComponent } from './home/reset-password-expired/reset-password-expired.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { SignupComponent } from './home/signup/signup.component';
import { UnverifiedEmailComponent } from './home/unverified-email/unverified-email.component';
import { LayoutUnauthenticatedComponent } from './layout/layout-unauthenticated/layout-unauthenticated.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { GenMapperContainerResolver } from './tools/gen-mapper/gen-mapper-container.resolver';
import { GenMapperContainerComponent } from './tools/gen-mapper/gen-mapper-container/gen-mapper-container.component';
import { GenMapperResolver } from './tools/gen-mapper/gen-mapper.resolver';
import { GenMapperComponent } from './tools/gen-mapper/gen-mapper/gen-mapper.component';
import { ChurchCirclesTemplate } from './tools/gen-mapper/templates/church-circles';
import { FourFieldsTemplate } from './tools/gen-mapper/templates/four-fields';
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
            path: 'signup',
            component: SignupComponent
        }, {
            path: 'recover-password',
            component: RecoverPasswordComponent
        }, {
            path: 'reset-password',
            component: ResetPasswordComponent,
        }, {
            path: 'reset-password-expired',
            component: ResetPasswordExpiredComponent
        }, {
            path: 'confirm-email',
            component: ConfirmEmailComponent
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
        children: [
            {
                path: 'account',
                component: DetailComponent,
                resolve: {
                    user: UserResolver
                }
            },
            {
                path: 'tools',
                component: ToolsComponent
            },
            {
                path: 'church-circles',
                component: GenMapperContainerComponent,
                resolve: {
                    documents: GenMapperContainerResolver,
                },
                data: {
                    template: ChurchCirclesTemplate
                },
                children: [
                    {
                        path: ':id',
                        component: GenMapperComponent,
                        resolve: {
                            document: GenMapperResolver
                        },
                        // Configuration is for local mode
                        runGuardsAndResolvers: 'always'
                    },
                    {
                        path: '',
                        component: GenMapperComponent
                    },
                ]
            },
            {
                path: 'four-fields',
                component: GenMapperContainerComponent,
                resolve: {
                    documents: GenMapperContainerResolver,
                },
                data: {
                    template: FourFieldsTemplate
                },
                children: [
                    {
                        path: ':id',
                        component: GenMapperComponent,
                        resolve: {
                            document: GenMapperResolver
                        }
                    },
                    {
                        path: '',
                        component: GenMapperComponent
                    },
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'tools'
    }
];

const maintenanceRoutes: Routes = [
    {
        path: '',
        redirectTo: 'maintenance',
        pathMatch: 'full'
    },
    {
        path: 'maintenance',
        component: MaintenanceComponent
    },
    {
        path: '**',
        redirectTo: 'maintenance'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            // Configuration is for local mode
            { onSameUrlNavigation: 'reload' }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {
}
