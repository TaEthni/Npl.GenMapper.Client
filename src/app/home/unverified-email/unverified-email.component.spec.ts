import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedEmailComponent } from './unverified-email.component';

describe('UnverifiedEmailComponent', () => {
  let component: UnverifiedEmailComponent;
  let fixture: ComponentFixture<UnverifiedEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnverifiedEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
