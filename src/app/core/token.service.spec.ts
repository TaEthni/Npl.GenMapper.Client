import { TestBed } from '@angular/core/testing';
import { TokenService } from '@core/token.service';

import { Token } from './token.model';

describe('TokenService', () => {
    let service: TokenService;
    const existing = new Token();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TokenService
            ]
        });

        localStorage.clear();
        localStorage.setItem(TokenService.storageKey, JSON.stringify(existing));

        service = TestBed.get(TokenService);
    });

    describe('get()', () => {
        it('should return existing token from localstorage', () => {
            const result = service.get().value;

            expect(result).toEqual(existing);
        });

        it('should return new token after set()', () => {
            const expected = new Token();
            expected.authToken = 'new token';
            service.set(expected);

            const result = service.get().value;

            expect(result).toEqual(expected);
        });

        it('should return null after clear()', () => {
            service.clear();

            const result = service.get().value;

            expect(result).toBeNull();
        });
    });

    describe('set()', () => {
        it('should set isAuthenticated true when token exists', () => {
            const token = new Token();
            token.authToken = 'foo';
            service.set(token);

            const result = service.get().value;

            expect(result.isAuthenticated).toBeTruthy();
        });

        it('should set isAuthenticated false when token not provided', () => {
            const token = new Token();
            token.authToken = '';
            service.set(token);

            const result = service.get().value;

            expect(result.isAuthenticated).toBeFalsy();
        });
    });
});
