import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '@npl-core/locale.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Pipe({
    name: 'locale'
})
export class LocalePipe extends Unsubscribable implements PipeTransform {

    constructor(
        private localeService: LocaleService
    ) { super(); }

    public transform(value: any, oneTime: boolean): Observable<string> | string {
        if (oneTime) {
            return this.localeService.t(value) || value;
        }

        return this.localeService.get()
            .pipe(
                startWith(this.localeService.t(value) || value),
                map(() => {
                    return this.localeService.t(value) || value;
                })
            );
    }
}
