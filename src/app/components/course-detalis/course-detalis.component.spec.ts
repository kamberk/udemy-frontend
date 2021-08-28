import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetalisComponent } from './course-detalis.component';

describe('CourseDetalisComponent', () => {
  let component: CourseDetalisComponent;
  let fixture: ComponentFixture<CourseDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetalisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
