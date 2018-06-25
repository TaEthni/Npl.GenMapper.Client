import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EntityService } from '@core/entity.service';
import { GMTemplate } from '../gen-mapper/gen-mapper.interface';
import { DocumentDto } from '@shared/document.model';
import { EntityType } from '@shared/entity.model';
import { map, filter } from 'rxjs/operators';
import { TokenService } from '@core/token.service';
import { of } from 'rxjs';
import { ToolService } from './tool.service';

export interface ResolvedTool {
    document?: DocumentDto;
    documents?: DocumentDto[];
}

@Injectable()
export class ToolResolver implements Resolve<Observable<ResolvedTool>> {
    constructor(
        private _toolService: ToolService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<ResolvedTool> {
        const template: GMTemplate = route.data.template;
        const documentId: string = route.params.id;

        return this._toolService
            .load(template.format)
            .pipe(map(docs => {
                const response = { documents: docs } as ResolvedTool;

                if (documentId) {
                    response.document = docs.find(a => '' + a.id === documentId);
                } else {
                    response.document = docs[0];
                }

                return response;
            }));
    }
}
