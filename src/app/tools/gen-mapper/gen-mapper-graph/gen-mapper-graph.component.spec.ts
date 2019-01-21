import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { GenMapperGraphComponent } from './gen-mapper-graph.component';

describe.skip('GenMapperGraphComponent', () => {
    let component: GenMapperGraphComponent;
    let fixture: ComponentFixture<GenMapperGraphComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GenMapperGraphComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenMapperGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
