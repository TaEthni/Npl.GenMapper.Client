import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { GenMapperComponent } from './gen-mapper.component';

describe.skip('GenMapperComponent', () => {
    let component: GenMapperComponent;
    let fixture: ComponentFixture<GenMapperComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GenMapperComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenMapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
