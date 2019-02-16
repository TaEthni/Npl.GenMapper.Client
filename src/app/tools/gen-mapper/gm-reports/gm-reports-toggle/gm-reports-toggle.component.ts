import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GenMapperView } from '../../gen-mapper/gen-mapper.component';

@Component({
    selector: 'app-gm-reports-toggle',
    templateUrl: './gm-reports-toggle.component.html',
    styleUrls: ['./gm-reports-toggle.component.scss']
})
export class GmReportsToggleComponent {

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
