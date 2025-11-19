import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NplLogoComponent } from './npl-logo.component';

xdescribe('NplLogoComponent', () => {
    let component: NplLogoComponent;
    let fixture: ComponentFixture<NplLogoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [NplLogoComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NplLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
