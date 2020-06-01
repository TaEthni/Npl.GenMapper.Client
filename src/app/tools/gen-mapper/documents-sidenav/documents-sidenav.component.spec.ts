import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { DocumentsSidenavComponent } from './documents-sidenav.component';


describe.skip('DocumentsSidenavComponent', () => {
    let component: DocumentsSidenavComponent;
    let fixture: ComponentFixture<DocumentsSidenavComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [DocumentsSidenavComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentsSidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
