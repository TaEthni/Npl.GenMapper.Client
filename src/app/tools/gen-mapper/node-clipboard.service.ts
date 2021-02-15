import { Injectable } from '@angular/core';
import { NodeDto } from '@npl-models/node.model';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import uuid from 'uuid';


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
        return this._clipboard.getValue();
    }

    public copyValue(): NodeDto[] {
        return this.cloneNodeTree(this.getValue());
    }

    public cloneNodeTree(nodes: NodeDto[]): NodeDto[] {
        nodes = cloneDeep(nodes);
        const idMap = {};

        nodes.forEach(node => {
            idMap[node.id] = uuid();
            node.id = idMap[node.id];
        });

        nodes.forEach(node => {
            if (node.parentId) {
                node.parentId = idMap[node.parentId];
            }
        });

        return nodes;
    }
}
