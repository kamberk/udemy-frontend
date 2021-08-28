import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.css']
})
export class ProgrammingComponent implements OnInit {

  programmingCourses: any;
  error: any;
  role = localStorage.getItem('role');
  searchTerm!: string;
  term!: string;

  constructor(
    private courseService: CourseService,
    public auth: AuthenticationService,
    private router: Router,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    this.courseService.getCourseByCat('programming').subscribe(
      (res: any) => {
        console.log(res.courses.length)
        this.programmingCourses = res.courses
      },
      (err: any) => {
        console.log(err);
        this.error = err.err;
      }
    );
  }

  AddToCart(course: any) {
    this.cart.addToCart(course);
    this.cart.setPrice(course.Price);
    console.log(course.Price)
    let x = document.getElementById("snackbar")!;
   x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  seeMore(id: any) {
    localStorage.setItem('courseID', id)
    this.courseService.setCourseID(id);
    this.router.navigate(['/course-details'])
  }

}
