import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Unsubscribable } from '@core/Unsubscribable';
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

    public filtered: string[];
    public control: FormControl = new FormControl();

    public ngOnInit(): void {
        this.filtered = this.countries.slice();
        this.control.setValue(this.country);

        if (this.country) {
            this.applyFilter(this.country);
        }

        this.control.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.applyFilter(result);
            });
    }

    public applyFilter(filterValue: string): void {
        filterValue = filterValue.trim().toLowerCase();
        this.filtered = this.countries.filter((c) => {
            return c.toLowerCase().indexOf(filterValue) > -1;
        });
    }

    public onSelectionChange(event: string): void {
        this.onChange.emit(event);
    }
}
