import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsNewDialogComponent } from './whats-new-dialog/whats-new-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UpdatesComponent } from './updates/updates.component';
import { UpdatesService } from './updates.service';



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
    ],
    providers: [
        UpdatesService
    ]
})
export class UpdatesModule { }
