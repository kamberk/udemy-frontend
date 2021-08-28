import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprooveComponent } from './approove.component';

describe('ApprooveComponent', () => {
  let component: ApprooveComponent;
  let fixture: ComponentFixture<ApprooveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprooveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprooveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
