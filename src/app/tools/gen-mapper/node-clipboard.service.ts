import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { GNode } from './gen-mapper.interface';

@Injectable({
    providedIn: 'root'
})
export class NodeClipboardService {
    private _clipboard: BehaviorSubject<GNode[]> = new BehaviorSubject(null);

    public set(nodes: GNode[]): void {
        this._clipboard.next(nodes);
    }

    public get(): Observable<GNode[]> {
        return this._clipboard.asObservable();
    }

    public getValue(): GNode[] {
        return this._clipboard.getValue();
    }
}
