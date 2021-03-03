import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthTestingModule } from '@npl-auth/testing';
import { MaterialModule } from '@shared/material/material.module';
import { TranslateTestingModule } from '@taethni/shared/localization/testing';

import { AccountLayoutComponent } from './account-layout.component';

describe('AccountLayoutComponent', () => {
    let component: AccountLayoutComponent;
    let fixture: ComponentFixture<AccountLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslateTestingModule,
                RouterTestingModule,
                MaterialModule,
                MatTabsModule,
                AuthTestingModule
            ],
            declarations: [AccountLayoutComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display all Account links if the user is not external', () => {
        //
    });

    it('should not display internal links if the user is external', () => {
        //
    });
});
