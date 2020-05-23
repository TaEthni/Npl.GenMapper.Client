import { Injectable } from '@angular/core';
import { NodeDto } from '@models/node.model';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class NodeClipboardService {
    private _clipboard: BehaviorSubject<NodeDto[]> = new BehaviorSubject(null);

    public set(nodes: NodeDto[]): void {
        this._clipboard.next(nodes);
    }

    public get(): Observable<NodeDto[]> {
        return this._clipboard.asObservable();
    }

    public getValue(): NodeDto[] {
        return cloneDeep(this._clipboard.getValue());
    }
}
