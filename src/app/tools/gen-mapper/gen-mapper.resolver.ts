import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DocumentDto } from '@shared/entity/document.model';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';

import { GenMapperService } from './gen-mapper.service';

@Injectable()
export class GenMapperResolver implements Resolve<Observable<DocumentDto>> {
    constructor(
        private genMapper: GenMapperService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<DocumentDto> {
        const documentId: string = route.params.id;

        if (!documentId) {
            return of(null);
        }

        return this.genMapper.getConfig().pipe(
            map(config => config.documents.find(d => d.id === documentId)),
            take(1),
            tap((doc) => {
                this.genMapper.setDocument(doc);
            })
        );
    }
}
