import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class Unsubscribable implements OnDestroy {
    public unsubsribe: Subject<any> = new Subject();

    public ngOnDestroy(): void {
        this.unsubsribe.next();
        this.unsubsribe.complete();
    }
}
