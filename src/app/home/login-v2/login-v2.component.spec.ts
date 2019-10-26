import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginV2Component } from './login-v2.component';

xdescribe('LoginV2Component', () => {
    let component: LoginV2Component;
    let fixture: ComponentFixture<LoginV2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginV2Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginV2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
