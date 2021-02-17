import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { NullGuid } from '@npl-core/constants';
import { DocumentService } from '@npl-core/document.service';
import { AppState, DocumentDto, IDocumentDto, IFlatNode, NodeDto, Template } from '@npl-data-access';
import { Dictionary, keyBy } from 'lodash';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { delayWhen, filter, map, take, takeUntil, tap } from 'rxjs/operators';

const documentStorageKey = 'offline-document-v1-';
const nodesStorageKey = 'offline-nodes-v2-'

export interface GenMapperConfig {
    documents: DocumentDto[];
    template: Template;
}

export interface DocumentContext {
    document: DocumentDto;
    nodes: NodeDto[];
}

@Injectable()
export class GenMapperService implements OnDestroy {
    private rawTemplate: Template;
    private _template = new ReplaySubject<Template>();
    private _documents = new BehaviorSubject<DocumentDto[]>(null);
    private _nodes: BehaviorSubject<NodeDto[]> = new BehaviorSubject<NodeDto[]>(null);
    private _selectedDocument: BehaviorSubject<DocumentDto> = new BehaviorSubject(null);
    private _selectedNode: BehaviorSubject<NodeDto> = new BehaviorSubject(null);
    private nodesById: Dictionary<NodeDto> = {};
    private unsubscribe = new Subject<boolean>();
    private isAuthenticated: boolean;

    public template$ = this._template.asObservable();
    public documents$ = this._documents.asObservable();
    public nodes$ = this._nodes.asObservable();

    public selectedDocument$ = this._selectedDocument.asObservable();
    public selectedNode$ = this._selectedNode.asObservable();

    constructor(
        private store: Store<AppState>,
        private documentService: DocumentService
    ) {
        this.store.select(isAuthenticated).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.isAuthenticated = result;
        });

        this.template$
            .pipe(
                filter(t => !!t),
                takeUntil(this.unsubscribe)
            )
            .subscribe(template => {
                this.rawTemplate = template;
                this._selectedDocument.next(null);
                this.refreshDocuments().subscribe();
            })

        this.selectedDocument$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(document => {
                this._selectedNode.next(null);

                if (!document) {
                    this._nodes.next(null);
                    return;
                }

                this.refreshDocumentNodes().subscribe();
            });

        this._nodes.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.processNodesOnSet(result);
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next(false);
        this.unsubscribe.complete();
    }

    public setDocument(documentId: string): void {
        this.documents$.pipe(filter(n => !!n), take(1)).subscribe(result => {
            const doc = result.find(d => d.id === documentId);
            this._selectedDocument.next(doc);
        });
    }

    public setNode(node: NodeDto): void {
        this._selectedNode.next(node);
    }

    public setNodeById(nodeId: string): void {
        const nodes = this._nodes.getValue();
        this.setNode(nodes.find(d => d.id === nodeId));
    }

    public loadFromResolver(template: Template): Observable<DocumentDto[]> {
        this._template.next(template);
        return this.documents$.pipe(filter(n => !!n), take(1));
    }

    public createDocument(value: IDocumentDto): Observable<DocumentDto> {
        value = value || {} as IDocumentDto;
        value.type = this.rawTemplate.id;
        value.title = value.title || 'No Name';
        if (!this.isAuthenticated) {
            let nodes = value.nodes;
            delete value.nodes;

            if (!nodes) {
                nodes = [this.rawTemplate.createDefaultNode()];
            }

            return this.setDocumentLocalStorage(value)
                .pipe(
                    delayWhen(() => this.refreshDocuments()),
                    delayWhen((doc) => this.setNodesLocalStorage(this.documentService.processNodesBeforeCreate(nodes, doc))),
                    tap((doc) => {
                        this._selectedDocument.next(doc)
                    })
                );
        }

        return this.documentService.create(value)
            .pipe(
                delayWhen(() => this.refreshDocuments()),
            )
    }

    public createNode(value: NodeDto): Observable<NodeDto> {
        if (!this.isAuthenticated) {
            const nodes = this._nodes.getValue();
            nodes.push(value);
            this.setNodesLocalStorage(nodes);
            return of(value);
        }

        return this.documentService.createNode(value);
    }

    public createDocumentNodes(nodes: NodeDto[]): Observable<NodeDto[]> {
        if (!this.isAuthenticated) {
            let saved = this._nodes.getValue();
            saved = saved.concat(nodes);
            this._nodes.next(saved);
            return this.setNodesLocalStorage(saved);
        }

        const document = this._selectedDocument.getValue();
        return this.documentService.batchCreateNodes(document.id, nodes)
            .pipe(
                tap(response => {
                    this._nodes.next(response);
                })
            )
    }

    public updateDocument(doc: DocumentDto): Observable<DocumentDto> {
        if (!this.isAuthenticated) {
            return this.setDocumentLocalStorage(doc);
        }

        return this.documentService.update(doc).pipe(
            delayWhen(() => this.refreshDocuments()),
        );
    }

    public updateNode(node: NodeDto): Observable<NodeDto> {
        if (!this.isAuthenticated) {
            return this.updateNodeLocalStorage(node);
        }

        return this.documentService.updateNode(node);
    }

    public updateDocumentNodes(nodes: NodeDto[]): Observable<NodeDto[]> {
        if (!this.isAuthenticated) {
            nodes.forEach(node => {
                const found = this.nodesById[node.id];
                Object.assign(found.attributes, node.attributes);
            });
            return this.setNodesLocalStorage(nodes);
        }

        const document = this._selectedDocument.getValue();
        return this.documentService.batchUpdateNodes(document.id, nodes);
    }

    public removeDocument(doc: DocumentDto): Observable<DocumentDto> {
        if (!this.isAuthenticated) {
            this.clearLocalStorage();
            this._selectedDocument.next(null);
            return of(null);
        }

        return this.documentService.remove(doc)
            .pipe(
                delayWhen(() => this.refreshDocuments()),
            );
    }

    public removeDocumentNodes(nodeIds: string[]): Observable<void> {
        if (!this.isAuthenticated) {
            const nodes = this._nodes.getValue().filter(n => !(nodeIds.indexOf(n.id) > -1));
            this.setNodesLocalStorage(nodes);
            this._nodes.next(nodes);
            return of(null);
        }

        const document = this._selectedDocument.getValue();
        return this.documentService.removeNodes(document.id, nodeIds);
    }

    public refreshDocuments(): Observable<DocumentDto[]> {
        let observer: Observable<DocumentDto[]>;

        if (!this.isAuthenticated) {
            observer = this.loadDocumentsFromLocalStorage();
        } else {
            observer = this.documentService.getAllByType(this.rawTemplate.id);
        }

        return observer.pipe(tap(documents => {
            this._documents.next(documents);
        }))
    }

    public refreshDocumentNodes(): Observable<NodeDto[]> {
        let observer: Observable<NodeDto[]>;

        if (!this.isAuthenticated) {
            observer = this.loadNodesFromLocalStorage();
        } else {
            const document = this._selectedDocument.getValue();
            observer = this.documentService.getDocumentNodes(document.id);
        }

        return observer.pipe(tap(nodes => {
            this._nodes.next(nodes);
        }));
    }

    public importChildNodesFromCSV(parentNode: NodeDto, childNodes: IFlatNode[]): Observable<NodeDto[]> {
        const document = this._selectedDocument.getValue();
        const nodes = this.documentService.processNodesBeforeCreate(childNodes, document);
        const rootNode = nodes.find(n => !n.parentId);
        rootNode.parentId = parentNode.id;
        // Return only the created nodes.
        return this.createDocumentNodes(nodes).pipe(map(d => nodes));
    }

    public loadDocumentsFromLocalStorage(): Observable<DocumentDto[]> {
        const local = localStorage.getItem(documentStorageKey + this.rawTemplate.id);
        let document: DocumentDto;

        if (local) {
            const json = JSON.parse(local);
            document = new DocumentDto(json);
        } else {
            document = new DocumentDto({ type: this.rawTemplate.id, id: 'local' });
        }

        return of([document]);
    }

    public loadNodesFromLocalStorage(): Observable<NodeDto[]> {
        const local = localStorage.getItem(nodesStorageKey + this.rawTemplate.id);
        let nodes: NodeDto[];

        if (local) {
            nodes = JSON.parse(local);
        } else {
            nodes = [this.rawTemplate.createDefaultNode()];
        }

        return of(nodes);
    }

    public setDocumentLocalStorage(doc: IDocumentDto): Observable<DocumentDto> {
        doc.id = 'local';
        localStorage.setItem(documentStorageKey + this.rawTemplate.id, JSON.stringify(doc));
        return of(new DocumentDto(doc));
    }

    public setNodesLocalStorage(nodes: NodeDto[]): Observable<NodeDto[]> {
        const json = JSON.stringify(nodes);
        localStorage.setItem(nodesStorageKey + this.rawTemplate.id, json);
        return of(nodes);
    }

    public updateNodeLocalStorage(node: NodeDto): Observable<NodeDto> {
        node.documentId = 'local';
        const nodes = this._nodes.getValue();
        const raw = nodes.find(d => d.id === node.id);
        Object.assign(raw, node);
        localStorage.setItem(nodesStorageKey + this.rawTemplate.id, JSON.stringify(nodes));
        return of(raw);
    }

    public clearLocalStorage(): void {
        localStorage.removeItem(documentStorageKey + this.rawTemplate.id);
        localStorage.removeItem(nodesStorageKey + this.rawTemplate.id);
    }

    public hasLocalDocument(): boolean {
        return !!localStorage.getItem(documentStorageKey + this.rawTemplate.id);
    }

    private processNodesOnSet(nodes: NodeDto[]): void {
        if (!nodes) { return; }

        let nodesById = this.nodesById = keyBy(nodes, (n) => n.id);

        nodes.forEach(node => {
            if (node.parentId === NullGuid) {
                node.parentId = null;
            }

            node.isRoot = !node.parentId;

            if (node.attributes.newGeneration) {
                node.attributes.gen = getParentGenCount(node);
            }

            if (node.parentId) {
                const parent = this.nodesById[node.parentId];

                if (parent) {
                    parent.attributes.hasChildNodes = true;
                }
            }

            return node;
        });

        function getParentGenCount(node: NodeDto): number {
            let depth = 1;
            let parent: NodeDto;

            if (!node.parentId) {
                return depth;
            }

            parent = nodesById[node.parentId];

            while (parent) {
                if (parent.attributes.newGeneration) {
                    depth++;
                }
                parent = nodesById[parent.parentId];
            }

            return depth;
        }
    }
}
