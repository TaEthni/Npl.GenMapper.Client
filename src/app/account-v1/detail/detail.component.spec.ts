import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '@npl-core/entity.service';
import { Entity, User } from '@npl-data-access';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';

import { DetailComponent } from './detail.component';


describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;
    let route: ActivatedRoute;
    let expectedUser: User;
    let entityService: EntityService;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
    imports: [
        NoopAnimationsModule,
        MatSnackBarModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        DetailComponent,
    ],
    providers: [
        {
            provide: ActivatedRoute,
            useValue: {}
        },
        {
            provide: EntityService,
            useValue: {}
        }
    ],
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        expectedUser = new User({ id: Entity.uuid() });
        route = TestBed.get(ActivatedRoute);
        route.data = of({ user: expectedUser });

        entityService = TestBed.get(EntityService);

        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
    });

    it('should should get user from route data', () => {
        fixture.detectChanges();
        expect(component.user).toEqual(expectedUser);
    });


});
