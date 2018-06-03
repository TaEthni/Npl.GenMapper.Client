import { Component, OnInit } from '@angular/core';
import { template } from './template';
import { GMTemplate } from '../gen-mapper-graph/gen-mapper-graph.service';

@Component({
    selector: 'app-church-circles',
    templateUrl: './church-circles.component.html',
    styleUrls: ['./church-circles.component.scss']
})
export class ChurchCirclesComponent implements OnInit {

    public template: GMTemplate = template;

    constructor() { }

    public ngOnInit(): void {
    }
}
