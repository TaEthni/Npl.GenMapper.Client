import { Component, Input, OnInit } from '@angular/core';

interface Logo {
    name: string;
    src: string;
}

@Component({
    selector: 'app-npl-logo',
    templateUrl: './npl-logo.component.html',
    styleUrls: ['./npl-logo.component.scss']
})
export class NplLogoComponent implements OnInit {

    public logos: Logo[] = [
        {
            name: 'npl',
            src: 'assets/npl-tools-logo-2018.png'
        }
    ];

    @Input()
    public size = 100;

    constructor() { }

    public ngOnInit(): void {
    }
}
