import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AuthenticationService } from '@npl-core/authentication.service';
import { DocumentDto } from '@npl-models/document.model';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { filter, take, tap } from 'rxjs/operators';

import { GenMapperService } from './gen-mapper.service';



@Injectable()
export class GenMapperResolver implements Resolve<Observable<DocumentDto>> {
    constructor(
        private genMapper: GenMapperService,
        private authService: AuthenticationService,
        private router: Router
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<DocumentDto> {
        const documentId: string = route.params.documentId;

        if (!documentId) {
            return of(null);
        }

        if (documentId !== 'local' && !this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
            return null;
        }

        this.genMapper.setDocument(documentId);
        return this.genMapper.selectedDocument$.pipe(
            tap(d => {
                if (!d) {
                    this.router.navigate(['/']);
                }
            }),
            filter(d => !!d && d.id === documentId),
            take(1),
        );
    }
}
