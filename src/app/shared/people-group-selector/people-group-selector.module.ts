import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalePipeModule } from '@shared/locale-pipe/locale-pipe.module';
import { MaterialModule } from '@shared/material/material.module';
import { PeopleGroupSelectionComponent } from './people-group-selection/people-group-selection.component';
import { PeopleGroupSelectorControlComponent } from './people-group-selector-control/people-group-selector-control.component';
import { PeopleGroupSelectorDialogComponent } from './people-group-selector-dialog/people-group-selector-dialog.component';
import { PeopleGroupSelectorComponent } from './people-group-selector/people-group-selector.component';

@NgModule({
    declarations: [
        PeopleGroupSelectorControlComponent,
        PeopleGroupSelectorDialogComponent,
        PeopleGroupSelectionComponent,
        PeopleGroupSelectorComponent
    ],
    entryComponents: [
        PeopleGroupSelectorDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        LocalePipeModule,
        FlexLayoutModule
    ],
    exports: [
        PeopleGroupSelectorControlComponent,
        PeopleGroupSelectorComponent
    ]
})
export class PeopleGroupSelectorModule { }
