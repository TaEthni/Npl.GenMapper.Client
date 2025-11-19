import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdatesComponent } from './updates.component';

describe('UpdatesComponent', () => {
  let component: UpdatesComponent;
  let fixture: ComponentFixture<UpdatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [UpdatesComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
