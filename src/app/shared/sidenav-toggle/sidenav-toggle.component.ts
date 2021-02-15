import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutService } from '@npl-core/layout.service';

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
