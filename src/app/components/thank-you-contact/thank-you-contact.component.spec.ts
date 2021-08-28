import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouContactComponent } from './thank-you-contact.component';

describe('ThankYouContactComponent', () => {
  let component: ThankYouContactComponent;
  let fixture: ComponentFixture<ThankYouContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
