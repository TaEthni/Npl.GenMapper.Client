import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@npl-core/authentication.service';
import { LocaleService } from '@npl-core/locale.service';
import { LocalePipe } from '@npl-shared/locale/locale.pipe';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';

import { ConfirmEmailComponent } from './confirm-email.component';

describe('ConfirmEmailComponent', () => {
    let component: ConfirmEmailComponent;
    let fixture: ComponentFixture<ConfirmEmailComponent>;
    let authService: AuthenticationService;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                ConfirmEmailComponent,
                LocalePipe
            ],
            providers: [
                LocaleService,
                {
                    provide: AuthenticationService,
                    useValue: {}
                }
            ]
        });
    });

    beforeEach(() => {
        const route = TestBed.get(ActivatedRoute);
        route.snapshot.queryParams.key = '123456';
        fixture = TestBed.createComponent(ConfirmEmailComponent);
        component = fixture.componentInstance;
        authService = TestBed.get(AuthenticationService);
    });

    it('should use Auth Service to send emailConfirmKey', () => {
        authService.acceptEmailConfirmation = jest.fn(() => of(null));
        fixture.detectChanges();
        expect(authService.acceptEmailConfirmation).toHaveBeenCalledWith('123456');
    });
});
