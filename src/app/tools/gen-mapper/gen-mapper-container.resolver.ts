import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { TemplateService } from '@npl-core/template.service';
import { DocumentDto, Template } from '@npl-data-access';
import { Observable } from 'rxjs/Observable';

import { GenMapperService } from './gen-mapper.service';

@Injectable()
export class GenMapperContainerResolver implements Resolve<Observable<DocumentDto[]>> {
    constructor(
        private genMapper: GenMapperService,
        private router: Router,
        private templateService: TemplateService
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<DocumentDto[]> {
        const templateId = route.params.templateId;
        const template: Template = this.templateService.getTemplate(templateId);

        if (!template) {
            this.router.navigate(['/gen-mapper']);
            return null;
        }

        return this.genMapper.loadFromResolver(template);
    }
}
