import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TemplateService } from '@core/template.service';
import { DocumentDto } from '@models/document.model';
import { Template } from '@models/template.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { GenMapperService } from './gen-mapper.service';



@Injectable()
export class GenMapperContainerResolver implements Resolve<Observable<DocumentDto[]>> {
    constructor(
        private genMapper: GenMapperService,
        private templateService: TemplateService
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<DocumentDto[]> {
        const templateId = route.params.templateId;
        const template: Template = this.templateService.getTemplate(templateId);
        return this.genMapper.loadFromResolver(template);
    }
}
