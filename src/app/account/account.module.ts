import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule
    ],
    declarations: [DetailComponent],
})
export class AccountModule { }
