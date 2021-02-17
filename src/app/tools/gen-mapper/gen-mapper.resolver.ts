import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { DocumentDto } from '@npl-models/document.model';
import { AppState } from '@npl-store';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { GenMapperService } from './gen-mapper.service';




@Injectable()
export class GenMapperResolver implements Resolve<Observable<DocumentDto>> {
    constructor(
        private genMapper: GenMapperService,
        private store: Store<AppState>,
        private router: Router
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<DocumentDto> {
        const documentId: string = route.params.documentId;

        if (!documentId) {
            return of(null);
        }

        return this.store.select(isAuthenticated)
            .pipe(
                filter(authenticated => {
                    if (documentId !== 'local' && !authenticated) {
                        this.router.navigate(['/']);
                        return false;
                    }
                    return true;
                }),
                tap(() => {
                    this.genMapper.setDocument(documentId);
                }),
                switchMap(() =>
                    this.genMapper.selectedDocument$.pipe(
                        tap(d => {
                            if (!d) {
                                this.router.navigate(['/']);
                            }
                        }),
                    )
                ),
                filter(d => !!d && d.id === documentId),
                take(1)
            )

        // if (documentId !== 'local' && !this.authService.isAuthenticated()) {
        //     this.router.navigate(['/']);
        //     return null;
        // }

        // this.genMapper.setDocument(documentId);
        // return this.genMapper.selectedDocument$.pipe(
        //     tap(d => {
        //         if (!d) {
        //             this.router.navigate(['/']);
        //         }
        //     }),
        //     filter(d => !!d && d.id === documentId),
        //     take(1),
        // );
    }
}
