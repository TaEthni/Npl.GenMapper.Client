import { Injectable } from '@angular/core';
import { EntityService } from '@core/entity.service';
import { TokenService } from '@core/token.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DocumentDto } from '@shared/document.model';
import { EntityType } from '@shared/entity.model';
import { map } from 'rxjs/operators';

const localKey = 'user.local-document.v1';

@Injectable({
    providedIn: 'root'
})
export class ToolService {

    private _documents: BehaviorSubject<DocumentDto[]> = new BehaviorSubject<DocumentDto[]>(null);
    private _document: BehaviorSubject<DocumentDto> = new BehaviorSubject<DocumentDto>(null);

    constructor(
        private _entityService: EntityService,
        private _tokenService: TokenService
    ) { }

    public load(format: string): Observable<DocumentDto[]> {
        if (!this.isAuthenticated()) {
            const json = localStorage.getItem(localKey);
            const doc = json ? DocumentDto.create(JSON.parse(json)) : DocumentDto.create({ format });
            return of([doc]);
        }

        return this._entityService
            .getAll<DocumentDto>(EntityType.Documents)
            .pipe(map(docs => {
                return docs.filter(doc => doc.format === format);
            }));
    }

    public update(doc: DocumentDto): Observable<DocumentDto> {

        if (!this.isAuthenticated()) {
            localStorage.setItem(localKey, JSON.stringify(doc));
            return of(doc);
        }

        return this._entityService.update(doc);
    }

    public create(doc: DocumentDto): Observable<DocumentDto> {
        return this._entityService.create(doc);
    }

    public remove(doc: DocumentDto): Observable<DocumentDto> {
        if (!this.isAuthenticated()) {
            return of(null);
        }

        return this._entityService.delete(doc);
    }

    private isAuthenticated(): boolean {
        return this._tokenService.getValue().isAuthenticated;
    }
}
