import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@core/layout.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav-toggle',
    templateUrl: './sidenav-toggle.component.html',
    styleUrls: ['./sidenav-toggle.component.scss']
})
export class SidenavToggleComponent {

    public get sidenav(): MatSidenav {
        return this.layoutService.getSidenav();
    }

    constructor(
        private layoutService: LayoutService
    ) { }
}
