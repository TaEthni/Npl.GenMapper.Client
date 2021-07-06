import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsDateHistoryPipe } from './is-date-history.pipe';



@NgModule({
    declarations: [IsDateHistoryPipe],
    exports: [IsDateHistoryPipe],
    imports: [
        CommonModule
    ]
})
export class DateModule { }
