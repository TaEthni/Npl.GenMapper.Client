import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UpdatesService {

    private showUpdates = new Subject<void>();

    public get(): Observable<void> {
        return this.showUpdates.asObservable();
    }

    public show(): void {
        this.showUpdates.next();
    }
}
