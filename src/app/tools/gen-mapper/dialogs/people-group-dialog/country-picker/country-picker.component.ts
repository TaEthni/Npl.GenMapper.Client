import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Device } from '@npl-core/platform';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-country-picker',
    templateUrl: './country-picker.component.html',
    styleUrls: ['./country-picker.component.scss']
})
export class CountryPickerComponent extends Unsubscribable implements OnInit {
    @Input()
    public country: string;

    @Input()
    public countries: string[];

    @Output()
    public onChange = new EventEmitter<string>();

    public control: UntypedFormControl = new UntypedFormControl();
    public isHandHeld = Device.isHandHeld;

    public ngOnInit(): void {
        this.control.setValue(this.country);
        this.control.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.onChange.emit(result);
            });
    }
}
