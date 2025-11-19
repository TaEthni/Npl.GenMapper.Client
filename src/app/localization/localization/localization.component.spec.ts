import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocalizationComponent } from './localization.component';

describe('LocalizationComponent', () => {
  let component: LocalizationComponent;
  let fixture: ComponentFixture<LocalizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [LocalizationComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
