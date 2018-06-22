import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDialogComponent } from './documents-dialog.component';

describe('DocumentsDialogComponent', () => {
    let component: DocumentsDialogComponent;
    let fixture: ComponentFixture<DocumentsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DocumentsDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
