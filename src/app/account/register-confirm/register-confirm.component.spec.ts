import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthTestingModule } from '@npl-auth/testing';
import { TranslateTestingModule } from '@taethni/shared/localization/testing';

import { RegisterConfirmComponent } from './register-confirm.component';

describe('RegisterConfirmComponent', () => {
    let component: RegisterConfirmComponent;
    let fixture: ComponentFixture<RegisterConfirmComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [
        TranslateTestingModule,
        AuthTestingModule
    ],
    declarations: [RegisterConfirmComponent],
    providers: [],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
