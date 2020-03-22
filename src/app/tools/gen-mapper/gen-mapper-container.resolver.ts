import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Template } from '@models/template.model';
import { GMTemplate } from '@templates';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { GenMapperConfig, GenMapperService } from './gen-mapper.service';
import { TemplateService } from './template.service';



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
