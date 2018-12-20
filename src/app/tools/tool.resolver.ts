import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { DocumentDto } from '@shared/entity/document.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { GMTemplate } from '../gen-mapper/gen-mapper.interface';
import { ToolService } from './tool.service';

export interface ResolvedTool {
    document?: DocumentDto;
    documents?: DocumentDto[];
}

@Injectable()
export class ToolResolver implements Resolve<Observable<ResolvedTool>> {
    constructor(
        private _toolService: ToolService,
        private _router: Router,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<ResolvedTool> {
        const template: GMTemplate = route.data.template;
        let documentId: string = route.params.id;

        return this._toolService
            .load(template.format)
            .pipe(map(docs => {
                const response = { documents: docs } as ResolvedTool;

                if (!documentId && docs.length) {
                    documentId = docs[0].id;
                    this._router.navigate([template.name, documentId]);
                }

                if (documentId) {
                    response.document = docs.find(a => '' + a.id === documentId);
                } else {
                    response.document = docs[0];
                }

                return response;
            }));
    }
}
