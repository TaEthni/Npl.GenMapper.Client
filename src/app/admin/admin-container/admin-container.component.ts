import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-container',
    templateUrl: './admin-container.component.html',
    styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {

    public isLoading: boolean;

    constructor() { }

    public ngOnInit(): void {

    }
}
