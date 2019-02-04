import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { Component, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { User } from '@shared/entity/user.model';
import { of } from 'rxjs';
import { EntityService } from '@core/entity.service';
import { configureTestSuite } from 'ng-bullet';
import { Entity } from '@shared/entity/entity.model';
import { By } from '@angular/platform-browser';

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
            ]
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
