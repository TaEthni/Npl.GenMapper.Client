import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    public transform(value: any[], prop: string, direction: 'ASC' | 'DES' = 'ASC'): any[] {
        if (value && Array.isArray(value)) {
            return value.sort((a, b) => {

                let avalue = (a[prop] || '');
                let bvalue = (b[prop] || '');

                if (typeof avalue === 'string') {
                    avalue = avalue.toLowerCase();
                }

                if (typeof bvalue === 'string') {
                    bvalue = bvalue.toLowerCase();
                }

                if (avalue > bvalue) {
                    return direction === 'ASC' ? 1 : -1;
                } else if (avalue < bvalue) {
                    return direction === 'ASC' ? -1 : 1;
                }

                return 0;
            });
        }

        return value;
    }
}
