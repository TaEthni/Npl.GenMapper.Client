import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocalePipe } from './locale.pipe';

@NgModule({
    declarations: [
        LocalePipe
    ],
    exports: [
        LocalePipe
    ],
    imports: [
        CommonModule
    ]
})
export class LocalePipeModule { }
