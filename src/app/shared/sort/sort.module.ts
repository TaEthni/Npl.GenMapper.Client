import { NgModule } from '@angular/core';
import { SortPipe } from './sort.pipe';

@NgModule({
    declarations: [SortPipe],
    exports: [SortPipe]
})
export class SortModule { }
