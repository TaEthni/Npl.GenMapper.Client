import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChurchCirclesComponent } from './church-circles/church-circles.component';
import { GenMapperModule } from '../../gen-mapper/gen-mapper.module';
import { SharedModule } from '@shared/shared.module';
import { REACTIVE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        GenMapperModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [ChurchCirclesComponent]
})
export class ChurchCirclesModule { }
