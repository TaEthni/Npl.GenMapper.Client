import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPeopleGroupDialogComponent } from './select-people-group-dialog.component';


describe('AddPeopleGroupDialogComponent', () => {
    let component: SelectPeopleGroupDialogComponent;
    let fixture: ComponentFixture<SelectPeopleGroupDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectPeopleGroupDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectPeopleGroupDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
