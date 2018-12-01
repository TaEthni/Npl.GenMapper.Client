import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-npl-logo',
    templateUrl: './npl-logo.component.html',
    styleUrls: ['./npl-logo.component.scss']
})
export class NplLogoComponent implements OnInit {
    @Input()
    public size = 100;

    constructor() { }

    public ngOnInit(): void {
    }
}
