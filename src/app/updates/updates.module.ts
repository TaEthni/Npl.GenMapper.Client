import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@npl-shared/shared.module';

import { UpdatesService } from './updates.service';
import { UpdatesComponent } from './updates/updates.component';
import { WhatsNewDialogComponent } from './whats-new-dialog/whats-new-dialog.component';


@NgModule({
    declarations: [
        WhatsNewDialogComponent,
        UpdatesComponent
    ],
    exports: [
        UpdatesComponent
    ],
    entryComponents: [
        WhatsNewDialogComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FlexLayoutModule,
        TranslateModule
    ],
    providers: [
        UpdatesService
    ]
})
export class UpdatesModule { }
