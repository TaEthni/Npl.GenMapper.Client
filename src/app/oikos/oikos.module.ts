import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MigrateStreamDialogComponent } from './migrate-stream-dialog/migrate-stream-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '@npl-shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [MigrateStreamDialogComponent],
    imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, MaterialModule],
})
export class OikosModule {}
