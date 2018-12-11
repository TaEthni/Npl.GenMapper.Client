import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '@core/locale.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil, filter, map, startWith } from 'rxjs/operators';

@Pipe({
    name: 'locale'
})
export class LocalePipe extends Unsubscribable implements PipeTransform {

    constructor(
        private localeService: LocaleService
    ) { super(); }

    public transform(value: any): Observable<string> {
        return this.localeService.get()
            .pipe(
                startWith(this.localeService.t(value)),
                map(() => {
                    return this.localeService.t(value);
                })
            );
    }
}
