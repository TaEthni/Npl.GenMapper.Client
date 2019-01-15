import { async, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationGuard } from '@core/authentication.guard';
import { TokenServiceMock } from '@core/testing/token-service.mock';
import { Token } from '@core/token.model';
import { TokenService } from '@core/token.service';
import { WindowRefService } from '@core/windowref.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

xdescribe('AuthenticationGuard', () => {
    let guard: AuthenticationGuard;
    let windowRef: WindowRefService;
    let tokenService: TokenService;
    let router: Router;
    let windowLocationAssignSpy;
    let routerNavigateSpy;

    beforeEach(async(() => {
        const mockWindowRef = {
            location: {
                assign: () => { }
            }
        };

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            providers: [
                { provide: WindowRefService, useFactory: () => mockWindowRef },
                TokenService,
                AuthenticationGuard
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        windowRef = TestBed.get(WindowRefService);
        router = TestBed.get(Router);
        tokenService = TestBed.get(TokenService);
        guard = TestBed.get(AuthenticationGuard);

        windowLocationAssignSpy = spyOn(window.location, 'assign');
        routerNavigateSpy = spyOn(router, 'navigate').and.returnValue(of(true));
    });

    const setupToken = (config: TokenConfig) => {
        const token = new Token();
        token.isAuthenticated = config.isAuthenticated;
        token.isEmailVerified = config.isEmailVerified;

        const now = new Date();
        if (config.isExpired) {
            token.expires = new Date(now.getTime() - 5000).toISOString();
        } else {
            token.expires = new Date(now.getTime() + 5000).toISOString();
        }

        // tokenService.get = jest.fn(() => Observable.of(token));
    };
    interface TokenConfig {
        isAuthenticated: boolean;
        isEmailVerified: boolean;
        isExpired: boolean;
    }

    describe('canActivate()', () => {
        it('should activate with valid token', () => {
            setupToken({
                isAuthenticated: true,
                isEmailVerified: true,
                isExpired: false
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(result).toBeTruthy();
        });

        it('should not activate with no token', () => {
            tokenService.clear();

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(result).toBeFalsy();
        });

        it('should not activate with unauthenticated token', () => {
            setupToken({
                isAuthenticated: false,
                isEmailVerified: true,
                isExpired: false
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(result).toBeFalsy();
        });

        it('should not activate with unverified email', () => {
            setupToken({
                isAuthenticated: true,
                isEmailVerified: false,
                isExpired: false
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(result).toBeFalsy();
        });

        it('should not activate with expired token', () => {
            setupToken({
                isAuthenticated: true,
                isEmailVerified: true,
                isExpired: true
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(result).toBeFalsy();
        });

        it('should redirect to authenticate with unauthenticated token', () => {
            setupToken({
                isAuthenticated: false,
                isEmailVerified: true,
                isExpired: false
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(windowLocationAssignSpy).toHaveBeenCalledWith('/authenticate');
        });

        it('should redirect to authenticate with expired token', () => {
            setupToken({
                isAuthenticated: true,
                isEmailVerified: true,
                isExpired: true
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(windowLocationAssignSpy).toHaveBeenCalledWith('/authenticate');
        });

        it('should not redirect with valid token', () => {
            setupToken({
                isAuthenticated: true,
                isEmailVerified: true,
                isExpired: false
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(windowLocationAssignSpy).toHaveBeenCalledTimes(0);
        });

        it('should navigate to unverified with unverified email', () => {
            setupToken({
                isAuthenticated: true,
                isEmailVerified: false,
                isExpired: false
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(routerNavigateSpy).toHaveBeenCalledWith(['unverified']);
        });

        it('should not navigate with valid token', () => {
            setupToken({
                isAuthenticated: true,
                isEmailVerified: true,
                isExpired: false
            });

            const result = guard.canActivate(TestBed.get(ActivatedRoute));

            expect(routerNavigateSpy).toHaveBeenCalledTimes(0);
        });
    });
});
