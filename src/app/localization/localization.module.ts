import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@npl-shared/shared.module';

import { LanguageListComponent } from './language-list/language-list.component';
import { LocalizationComponent } from './localization/localization.component';
import { TranslateComponent } from './translate/translate.component';

const routes: Routes = [
    {
        path: '',
        component: LocalizationComponent
    },
    {
        path: ':code',
        component: TranslateComponent
    }
];

@NgModule({
    declarations: [LocalizationComponent, TranslateComponent, LanguageListComponent],
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes),

        ReactiveFormsModule,
        FlexLayoutModule,
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class LocalizationModule { }
