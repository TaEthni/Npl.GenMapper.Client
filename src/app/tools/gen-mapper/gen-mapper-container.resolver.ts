import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DocumentDto } from '@shared/entity/document.model';
import { GMTemplate } from '@templates';
import { Observable } from 'rxjs/Observable';

import { GenMapperService } from './gen-mapper.service';

@Injectable()
export class GenMapperContainerResolver implements Resolve<Observable<DocumentDto[]>> {
    constructor(
        private genMapper: GenMapperService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<DocumentDto[]> {
        const template: GMTemplate = route.data.template;
        return this.genMapper.load(template);
    }
}
