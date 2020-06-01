import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenMapperView } from '../../../gen-mapper-view.enum';


@Component({
    selector: 'app-reports-toggle',
    templateUrl: './reports-toggle.component.html',
    styleUrls: ['./reports-toggle.component.scss']
})
export class ReportsToggleComponent {

    @Input()
    public view: GenMapperView;

    @Output()
    public reportsIconClick = new EventEmitter<void>();

    @Output()
    public backIconClick = new EventEmitter<void>();

    public viewTypes = GenMapperView;

    public onMapIconClick(): void {
        this.reportsIconClick.emit();
    }

    public onBackIconClick(): void {
        this.backIconClick.emit();
    }
}
