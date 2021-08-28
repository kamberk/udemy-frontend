import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberCodeComponent } from './remember-code.component';

describe('RememberCodeComponent', () => {
  let component: RememberCodeComponent;
  let fixture: ComponentFixture<RememberCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RememberCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
