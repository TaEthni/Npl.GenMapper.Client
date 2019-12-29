import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LocalizationComponent } from './localization/localization.component';
import { TranslateComponent } from './translate/translate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LanguageListComponent } from './language-list/language-list.component';

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
