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
import { ToolsComponent } from './tools/tools/tools.component';
import { ToolContainerComponent } from './tools/tool-container/tool-container.component';
import { GMTemplateNames } from '@shared/GMTemplates';
import { ToolComponent } from './tools/tool/tool.component';
import { ChurchCirclesTemplate } from './templates/church-circles';
import { DisciplesTemplate } from './templates/disciples';
import { MovementeerTemplate } from './templates/movementeer';
import { FourFieldsTemplate } from './templates/four-fields';
import { ToolResolver } from './tools/tool.resolver';
import { ToolOfflineComponent } from './tools/tool-offline/tool-offline.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { RecoverPasswordComponent } from './home/recover-password/recover-password.component';
import { SignupComponent } from './home/signup/signup.component';
import { DetailComponent } from './account/detail/detail.component';
import { ResetPasswordExpiredComponent } from './home/reset-password-expired/reset-password-expired.component';
import { UserResolver } from '@core/user.resolver';

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
            path: 'reset-password/:token',
            component: ResetPasswordComponent,
        }, {
            path: 'reset-password-expired',
            component: ResetPasswordExpiredComponent
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
            }, {
                path: ChurchCirclesTemplate.name,
                component: ToolContainerComponent,
                children: [
                    {
                        path: 'offline',
                        component: ToolOfflineComponent,
                        data: {
                            template: ChurchCirclesTemplate
                        }
                    },
                    {
                        path: ':id',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: ChurchCirclesTemplate
                        }
                    },
                    {
                        path: '',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: ChurchCirclesTemplate
                        }
                    }
                ]
            }, {
                path: FourFieldsTemplate.name,
                component: ToolContainerComponent,
                children: [
                    {
                        path: 'offline',
                        component: ToolOfflineComponent,
                        data: {
                            template: FourFieldsTemplate
                        }
                    },
                    {
                        path: '',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: FourFieldsTemplate
                        }
                    },
                    {
                        path: ':id',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: FourFieldsTemplate
                        }
                    }
                ]
            }, {
                path: DisciplesTemplate.name,
                component: ToolContainerComponent,
                children: [
                    {
                        path: 'offline',
                        component: ToolOfflineComponent,
                        data: {
                            template: DisciplesTemplate
                        }
                    },
                    {
                        path: '',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: DisciplesTemplate
                        }
                    },
                    {
                        path: ':id',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: DisciplesTemplate
                        }
                    }
                ]
            }, {
                path: MovementeerTemplate.name,
                component: ToolContainerComponent,
                children: [
                    {
                        path: 'offline',
                        component: ToolOfflineComponent,
                        data: {
                            template: MovementeerTemplate
                        }
                    },
                    {
                        path: '',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: MovementeerTemplate
                        }
                    },
                    {
                        path: ':id',
                        component: ToolComponent,
                        canActivate: [AuthenticationGuard],
                        resolve: {
                            tool: ToolResolver
                        },
                        data: {
                            template: MovementeerTemplate
                        }
                    }
                ]
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
