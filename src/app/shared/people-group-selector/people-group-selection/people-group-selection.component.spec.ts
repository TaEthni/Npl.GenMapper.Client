import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleGroupSelectionComponent } from './people-group-selection.component';


describe('PeopleGroupSelectionComponent', () => {
    let component: PeopleGroupSelectionComponent;
    let fixture: ComponentFixture<PeopleGroupSelectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PeopleGroupSelectionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PeopleGroupSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
