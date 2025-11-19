import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsLayoutComponent } from './teams-layout.component';

describe('TeamsLayoutComponent', () => {
  let component: TeamsLayoutComponent;
  let fixture: ComponentFixture<TeamsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TeamsLayoutComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
