import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmAttributesComponent } from './gm-attributes.component';
import { configureTestSuite } from 'ng-bullet';

describe.skip('GmAttributesComponent', () => {
    let component: GmAttributesComponent;
    let fixture: ComponentFixture<GmAttributesComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GmAttributesComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GmAttributesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
