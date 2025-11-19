import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { GenMapperContainerComponent } from './gen-mapper-container.component';

describe.skip('GenMapperContainerComponent', () => {
    let component: GenMapperContainerComponent;
    let fixture: ComponentFixture<GenMapperContainerComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
    declarations: [GenMapperContainerComponent],
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenMapperContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
