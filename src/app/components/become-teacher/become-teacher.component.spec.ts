import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeTeacherComponent } from './become-teacher.component';

describe('BecomeTeacherComponent', () => {
  let component: BecomeTeacherComponent;
  let fixture: ComponentFixture<BecomeTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
