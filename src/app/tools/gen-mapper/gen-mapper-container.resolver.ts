import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GMTemplate } from '@templates';
import { Observable } from 'rxjs/Observable';

import { GenMapperService, GenMapperConfig } from './gen-mapper.service';
import { TemplateService } from './template.service';
import { Template } from './template.model';

@Injectable()
export class GenMapperContainerResolver implements Resolve<Observable<GenMapperConfig>> {
    constructor(
        private genMapper: GenMapperService,
        private templateService: TemplateService
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<GenMapperConfig> {
        const gmtemplate: GMTemplate = route.data.template;
        const template: Template = this.templateService.getTemplate(gmtemplate.id);
        return this.genMapper.loadFromResolver(template);
    }
}
