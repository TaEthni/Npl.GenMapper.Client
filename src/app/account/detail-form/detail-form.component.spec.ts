import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFormComponent } from './detail-form.component';
import { configureTestSuite } from 'ng-bullet';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from '@core/account.service';
import { MatFormFieldModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalePipe } from '@shared/locale.pipe';
import { LocaleService } from '@core/locale.service';
import { User } from '@shared/entity/user.model';
import { EntityService } from '@core/entity.service';
import { Entity } from '@shared/entity/entity.model';
import { merge } from 'lodash';
import { of } from 'rxjs';

describe('DetailFormComponent', () => {
    let component: DetailFormComponent;
    let fixture: ComponentFixture<DetailFormComponent>;
    let entityService: EntityService;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                DetailFormComponent,
                LocalePipe,
            ],
            providers: [
                LocaleService,
                {
                    provide: EntityService,
                    useValue: {}
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailFormComponent);
        component = fixture.componentInstance;
        component.model = new User({ id: Entity.uuid() });
        entityService = TestBed.get(EntityService);
    });

    it('should create a form', () => {
        fixture.detectChanges();
        expect(component.form).toBeTruthy();
    });

    it('should create a form with email control', () => {
        fixture.detectChanges();
        expect(component.form.controls.email).toBeTruthy();
    });

    it('should create a form with username control', () => {
        fixture.detectChanges();
        expect(component.form.controls.username).toBeTruthy();
    });

    it('should create a form with password control', () => {
        fixture.detectChanges();
        expect(component.form.controls.password).toBeTruthy();
    });

    it('should create a form with confirm control', () => {
        fixture.detectChanges();
        expect(component.form.controls.confirm).toBeTruthy();
    });

    it('should disable email control', () => {
        fixture.detectChanges();
        expect(component.form.controls.email.disabled).toBeTruthy();
    });

    it.skip('should use EntityService to update the user', () => {
        fixture.detectChanges();
        const expectedUser = new User({ id: Entity.uuid() });
        const updatedUser = merge(expectedUser, { username: '1234' });
        entityService.update = jest.fn(() => of(null));
        // component.submit();
        fixture.detectChanges();
        expect(entityService.update).toHaveBeenCalledWith(updatedUser);
    });
});
