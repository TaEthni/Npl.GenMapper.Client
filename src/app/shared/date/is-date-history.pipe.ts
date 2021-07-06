import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';

@Pipe({
    name: 'isDateHistory'
})
export class IsDateHistoryPipe implements PipeTransform {
    public transform(value: Date | moment.Moment): boolean {
        const m = moment(value).utc();
        const now = moment().utc();
        return m < now;
    }
}
