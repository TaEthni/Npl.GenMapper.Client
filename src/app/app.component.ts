import { Component } from '@angular/core';
import { PeopleGroupService } from './tools/gen-mapper/people-group.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private peopleGroupService: PeopleGroupService
    ) {
        this.peopleGroupService.load().subscribe(() => { });
    }
}
