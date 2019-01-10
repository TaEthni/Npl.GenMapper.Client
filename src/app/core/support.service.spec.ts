import { TestBed } from '@angular/core/testing';

import { SupportService } from './support.service';

xdescribe('SupportService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SupportService = TestBed.get(SupportService);
        expect(service).toBeTruthy();
    });
});
