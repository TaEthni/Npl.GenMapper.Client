import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { EditNodeDialogComponent } from './edit-node-dialog.component';

describe.skip('EditNodeDialogComponent', () => {
    let component: EditNodeDialogComponent;
    let fixture: ComponentFixture<EditNodeDialogComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [EditNodeDialogComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditNodeDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
