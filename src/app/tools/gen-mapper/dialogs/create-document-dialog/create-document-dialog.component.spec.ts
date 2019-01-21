import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { CreateDocumentDialogComponent } from './create-document-dialog.component';

describe.skip('CreateDocumentDialogComponent', () => {
    let component: CreateDocumentDialogComponent;
    let fixture: ComponentFixture<CreateDocumentDialogComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [CreateDocumentDialogComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateDocumentDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
