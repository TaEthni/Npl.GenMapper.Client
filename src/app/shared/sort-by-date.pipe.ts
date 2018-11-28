import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

    public transform(value: any[], dateKey: string): any[] {
        return value.sort((a, b) => {
            return a[dateKey] > b[dateKey] ? -1 : a[dateKey] < b[dateKey] ? 1 : 0;
        });
    }
}
