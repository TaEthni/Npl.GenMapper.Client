import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class Unsubscribable implements OnDestroy {
    public unsubscribe: Subject<any> = new Subject();

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
