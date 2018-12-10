import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '@core/locale.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil, filter } from 'rxjs/operators';

@Pipe({
    name: 'locale'
})
export class LocalePipe extends Unsubscribable implements PipeTransform {

    constructor(
        private localeService: LocaleService
    ) { super(); }

    public transform(value: any): Observable<string> {
        const behavior = new BehaviorSubject<string>(this.localeService.t(value));

        this.localeService.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                behavior.next(this.localeService.t(value));
            });

        return behavior.asObservable().pipe(filter(v => !!v));
    }
}
