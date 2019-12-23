import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LocalizationComponent } from './localization/localization.component';

const routes: Routes = [
    {
        path: '',
        component: LocalizationComponent
    }
];

@NgModule({
    declarations: [LocalizationComponent],
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes),

        FlexLayoutModule,
        SharedModule,
    ]
})
export class LocalizationModule { }
