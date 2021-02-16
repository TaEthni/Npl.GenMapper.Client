import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataExportDialogComponent } from './data-export-dialog.component';


describe('DataExportDialogComponent', () => {
    let component: DataExportDialogComponent;
    let fixture: ComponentFixture<DataExportDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DataExportDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataExportDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
