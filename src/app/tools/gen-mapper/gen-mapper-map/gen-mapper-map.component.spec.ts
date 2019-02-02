import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenMapperMapComponent } from './gen-mapper-map.component';
import { configureTestSuite } from 'ng-bullet';

describe.skip('GenMapperMapComponent', () => {
    let component: GenMapperMapComponent;
    let fixture: ComponentFixture<GenMapperMapComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GenMapperMapComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenMapperMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
