import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChurchCirclesModule } from './church-circles/church-circles.module';
import { SharedModule } from '@shared/shared.module';
import { ToolsComponent } from './tools/tools.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChurchCirclesModule,
    RouterModule
  ],
  exports: [
    ChurchCirclesModule
  ],
  declarations: [ToolsComponent]
})
export class ToolsModule { }
