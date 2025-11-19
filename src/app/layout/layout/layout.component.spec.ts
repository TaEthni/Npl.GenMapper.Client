import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@npl-core/authentication.service';
import { LayoutService } from '@npl-core/layout.service';
import { TokenServiceMock } from '@npl-core/testing/token-service.mock';
import { configureTestSuite } from 'ng-bullet';

import { LayoutComponent } from './layout.component';


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
    ],
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        layoutService = TestBed.get(LayoutService);
        authService = TestBed.get(AuthenticationService);
        authService.refreshUser = jest.fn();
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
