import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchCirclesComponent } from './church-circles.component';

describe('ChurchCirclesComponent', () => {
    let component: ChurchCirclesComponent;
    let fixture: ComponentFixture<ChurchCirclesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChurchCirclesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChurchCirclesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
