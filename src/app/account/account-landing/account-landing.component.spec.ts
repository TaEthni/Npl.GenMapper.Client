import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthTestingModule } from '@npl-auth/testing';
import { TranslateTestingModule } from '@taethni/shared/localization/testing';

import { AccountLandingComponent } from './account-landing.component';

describe('AccountLandingComponent', () => {
    let component: AccountLandingComponent;
    let fixture: ComponentFixture<AccountLandingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        TranslateTestingModule,
        MatIconModule,
        MatCardModule,
        AuthTestingModule
    ],
    declarations: [AccountLandingComponent],
    providers: [],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display all Landing links if the user is not external', () => {
        //
    });

    it('should not display internal links if the user is external', () => {
        //
    });
});
