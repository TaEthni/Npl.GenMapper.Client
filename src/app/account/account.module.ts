import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [DetailComponent, DetailFormComponent],
    exports: [DetailFormComponent],
})
export class AccountModule { }
