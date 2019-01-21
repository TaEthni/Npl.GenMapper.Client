import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { GenMapperDocumentsComponent } from './gen-mapper-documents.component';

describe.skip('GenMapperDocumentsComponent', () => {
    let component: GenMapperDocumentsComponent;
    let fixture: ComponentFixture<GenMapperDocumentsComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [GenMapperDocumentsComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenMapperDocumentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
