import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenMapperViewTabsComponent } from './gen-mapper-view-tabs.component';
import { configureTestSuite } from 'ng-bullet';

describe.skip('GenMapperViewTabsComponent', () => {
    let component: GenMapperViewTabsComponent;
    let fixture: ComponentFixture<GenMapperViewTabsComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GenMapperViewTabsComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenMapperViewTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
