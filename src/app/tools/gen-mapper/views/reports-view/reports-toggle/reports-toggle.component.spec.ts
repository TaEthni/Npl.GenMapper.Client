import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { ReportsToggleComponent } from './reports-toggle.component';


describe.skip('GmReportsToggleComponent', () => {
    let component: ReportsToggleComponent;
    let fixture: ComponentFixture<ReportsToggleComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [ReportsToggleComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportsToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
