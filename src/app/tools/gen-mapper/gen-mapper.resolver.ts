import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DocumentDto } from '@models/document.model';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { filter, take } from 'rxjs/operators';
import { GenMapperService } from './gen-mapper.service';



@Injectable()
export class GenMapperResolver implements Resolve<Observable<DocumentDto>> {
    constructor(
        private genMapper: GenMapperService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<DocumentDto> {
        const documentId: string = route.params.documentId;

        if (!documentId) {
            return of(null);
        }

        this.genMapper.setDocument(documentId);
        return this.genMapper.selectedDocument$.pipe(filter(d => !!d && d.id === documentId), take(1));
    }
}
