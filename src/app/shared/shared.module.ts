import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { SidenavToggleComponent } from './sidenav-toggle/sidenav-toggle.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [SidenavToggleComponent],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        SidenavToggleComponent
    ],
    entryComponents: [
    ]
})
export class SharedModule { }
