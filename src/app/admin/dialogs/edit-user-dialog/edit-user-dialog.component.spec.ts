import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditUserDialogComponent } from './edit-user-dialog.component';

xdescribe('EditUserDialogComponent', () => {
    let component: EditUserDialogComponent;
    let fixture: ComponentFixture<EditUserDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    declarations: [EditUserDialogComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditUserDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
