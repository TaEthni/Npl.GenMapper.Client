import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenMapperGraphComponent } from './gen-mapper-graph.component';

xdescribe('GenMapperGraphComponent', () => {
    let component: GenMapperGraphComponent;
    let fixture: ComponentFixture<GenMapperGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GenMapperGraphComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GenMapperGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
