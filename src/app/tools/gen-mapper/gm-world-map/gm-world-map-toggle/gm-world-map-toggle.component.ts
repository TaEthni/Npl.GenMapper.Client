import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenMapperView } from '../../gen-mapper-view.enum';

@Component({
    selector: 'app-gm-world-map-toggle',
    templateUrl: './gm-world-map-toggle.component.html',
    styleUrls: ['./gm-world-map-toggle.component.scss']
})
export class GmWorldMapToggleComponent {

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
