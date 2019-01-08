import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { configureTestSuite } from 'ng-bullet';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from '@core/token.service';
import { TokenServiceMock } from '@core/testing/token-service.mock';
import { AuthenticationService } from '@core/authentication.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '@shared/entity/user.model';
import { of } from 'rxjs';
import { LayoutService } from '@core/layout.service';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let authService: AuthenticationService;
    let layoutService: LayoutService;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [LayoutComponent],
            providers: [
                TokenServiceMock.provide(),
                {
                    provide: AuthenticationService,
                    useValue: {}
                }
            ]
        });
    });

    beforeEach(() => {
        layoutService = TestBed.get(LayoutService);
        authService = TestBed.get(AuthenticationService);
        authService.getUser = jest.fn(() => of(new User()));
        authService.refreshUser = jest.fn();
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
