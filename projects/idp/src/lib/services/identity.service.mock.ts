import { Injectable, Provider } from '@angular/core';
import { of } from 'rxjs';

import { IdentityService } from './identity.service';

@Injectable()
export class IdentityMockService {
    public static provider: Provider = { provide: IdentityService, useClass: IdentityMockService };

    public static provide(): Provider {
        return { provide: IdentityService, useClass: IdentityMockService };
    }

    public register = jest.fn(() => of(null));

    public changeUserName = jest.fn(() => of(null));

    public changePassword = jest.fn(() => of(null));

    public getMFACode = jest.fn(() => of(null));

    public verifyMFACode = jest.fn(() => of(null));

    public enableMFA = jest.fn(() => of(null));

    public disableMFA = jest.fn(() => of(null));

    public resetMFA = jest.fn(() => of(null));

    public getRecoveryCodes = jest.fn(() => of(null));
}

export const IdentityServiceTestingProvider: Provider = {
    provide: IdentityService, useClass: IdentityMockService
}
