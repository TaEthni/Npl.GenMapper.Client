import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenMapperGraphComponent } from './gen-mapper-graph/gen-mapper-graph.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GenMapperGraphComponent],
  exports: [GenMapperGraphComponent]
})
export class GenMapperModule { }
