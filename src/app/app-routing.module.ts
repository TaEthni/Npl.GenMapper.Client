import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { NoDocumentViewComponent } from './tools/gen-mapper/views/no-document-view/no-document-view.component';
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
            // {
            //     path: 'account',
            //     component: DetailComponent,
            //     canActivate: [OAuthGuard],
            //     resolve: {
            //         user: UserResolver
            //     }
            // },
            // {
            //     path: 'account/user-agreement',
            //     component: UserAgreementComponent,
            //     canActivate: [AuthorizationGuard],
            //     resolve: {
            //         user: UserResolver
            //     }
            // },
            // {
            //     path: 'account/data-export',
            //     component: DataExportComponent,
            //     canActivate: [AuthorizationGuard, DesktopOnlyGuard],
            //     resolve: {
            //         user: UserResolver
            //     }
            // },
            // {
            //     path: 'account/data-export-pending',
            //     component: DataExportPendingComponent,
            //     canActivate: [AuthorizationGuard, DesktopOnlyGuard],
            //     resolve: {
            //         user: UserResolver
            //     }
            // },
            // {
            //     path: 'account/data-export-unauthorized',
            //     component: DataExportUnauthorizedComponent,
            //     canActivate: [DesktopOnlyGuard]
            // },
            // {
            //     path: 'account/data-export/:sessionId',
            //     component: DataExportDownloadComponent,
            //     canActivate: [AuthorizationGuard, DesktopOnlyGuard],
            //     resolve: {
            //         user: UserResolver
            //     }
            // },
            {
                path: 'account',
                loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
            },
            {
                path: 'tools',
                component: ToolsComponent
            },
            {
                path: 'gen-mapper',
                children: [
                    {
                        path: ':templateId',
                        component: GenMapperContainerComponent,
                        resolve: {
                            config: GenMapperContainerResolver
                        },
                        children: [
                            {
                                path: '',
                                component: NoDocumentViewComponent,
                            },
                            {
                                path: ':documentId',
                                component: GenMapperComponent,
                                resolve: {
                                    nodes: GenMapperResolver
                                }
                            }
                        ]
                    },
                    {
                        path: '**',
                        redirectTo: '/tools'
                    }
                ]
            },
            {
                path: 'localization',
                loadChildren: () => import('./localization/localization.module').then(m => m.LocalizationModule)
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
            // Configuration is for local mode
            {
                onSameUrlNavigation: 'reload',
                relativeLinkResolution: 'corrected',
                paramsInheritanceStrategy: 'always'
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {
}
