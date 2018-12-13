import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'joinList'
})
export class JoinListPipe implements PipeTransform {
    public transform(value: string[]): string {
        return value ? value.join(' ') : null;
    }
}
