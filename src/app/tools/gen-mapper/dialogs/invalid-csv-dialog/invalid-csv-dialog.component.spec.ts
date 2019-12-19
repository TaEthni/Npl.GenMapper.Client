import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvalidCsvDialogComponent } from './invalid-csv-dialog.component';


describe('InvalidCsvDialogComponent', () => {
    let component: InvalidCsvDialogComponent;
    let fixture: ComponentFixture<InvalidCsvDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InvalidCsvDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InvalidCsvDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
