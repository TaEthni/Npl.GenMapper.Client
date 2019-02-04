import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodeFormComponent } from './edit-node-form.component';
import { configureTestSuite } from 'ng-bullet';

describe.skip('EditNodeFormComponent', () => {
    let component: EditNodeFormComponent;
    let fixture: ComponentFixture<EditNodeFormComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [EditNodeFormComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditNodeFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
