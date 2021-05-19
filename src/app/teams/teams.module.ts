import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule, Routes } from '@angular/router';
import { DateModule } from '@npl-shared/date/date.module';
import { SharedModule } from '@npl-shared/shared.module';

import { TeamCreateDialogComponent } from './team-create-dialog/team-create-dialog.component';
import { TeamDetailDialogComponent } from './team-detail-dialog/team-detail-dialog.component';
import { TeamInvitesCreateDialogComponent } from './team-invites-create-dialog/team-invites-create-dialog.component';
import { TeamInvitesComponent } from './team-invites/team-invites.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamOwnerGuard } from './team-owner.guard';
import { TeamsLayoutComponent } from './teams-layout/teams-layout.component';
import { TeamsListComponent } from './teams-list/teams-list.component';

const routes: Routes = [
    {
        path: '',
        component: TeamsListComponent
    },
    {
        path: ':teamId/members',
        canActivate: [TeamOwnerGuard],
        component: TeamMembersComponent
    },
    {
        path: ':teamId/invites',
        canActivate: [TeamOwnerGuard],
        component: TeamInvitesComponent
    },
    // {
    //     path: '',
    //     component: TeamsLayoutComponent,
    //     children: [

    //     ]
    // },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [
        TeamsListComponent,
        TeamDetailDialogComponent,
        TeamMembersComponent,
        TeamsLayoutComponent,
        TeamCreateDialogComponent,
        TeamInvitesComponent,
        TeamInvitesCreateDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        SharedModule,
        MatChipsModule,
        MatAutocompleteModule,
        DateModule,
        RouterModule.forChild(routes)
    ]
})
export class TeamsModule { }
