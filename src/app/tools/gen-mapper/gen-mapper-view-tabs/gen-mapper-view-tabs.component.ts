import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GenMapperView } from '../gen-mapper/gen-mapper.component';

@Component({
    selector: 'app-gen-mapper-view-tabs',
    templateUrl: './gen-mapper-view-tabs.component.html',
    styleUrls: ['./gen-mapper-view-tabs.component.scss']
})
export class GenMapperViewTabsComponent {
    @Input()
    public view: GenMapperView;

    @Output()
    public mapIconClick = new EventEmitter<void>();

    @Output()
    public backIconClick = new EventEmitter<void>();

    public viewTypes = GenMapperView;

    public onMapIconClick(): void {
        this.mapIconClick.emit();
    }

    public onBackIconClick(): void {
        this.backIconClick.emit();
    }
}
