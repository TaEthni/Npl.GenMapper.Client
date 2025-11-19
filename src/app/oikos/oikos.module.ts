import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MigrateStreamDialogComponent } from './migrate-stream-dialog/migrate-stream-dialog.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MaterialModule } from '@npl-shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';

@NgModule({
    declarations: [MigrateStreamDialogComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MaterialModule,
        MatInputModule,
        MatAutocompleteModule,
        MatChipsModule,
    ],
})
export class OikosModule {}
