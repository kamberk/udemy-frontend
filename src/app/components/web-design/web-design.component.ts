import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { CartService } from 'src/app/cart.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  styleUrls: ['./web-design.component.css'],
})
export class WebDesignComponent implements OnInit {

  courses: any;
  role = localStorage.getItem('role')
  error: any;
  searchTerm!: string;
  term!: string;

  constructor(
    private courseService: CourseService,
    public auth: AuthenticationService,
    private cart: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseService.getCourseByCat('web-dev').subscribe(
      (res: any) => {
        console.log(res.courses.length)
        this.courses = res.courses
      },
      (err: any) => {
        console.log(err);
        this.error = err.err;
      }
    );
  }

  seeMore(id: any) {
    localStorage.setItem('courseID', id)
    this.courseService.setCourseID(id);
    this.router.navigate(['/course-details'])
  }

  AddToCart(course: any) {
    this.cart.addToCart(course);
    this.cart.setPrice(course.Price);
    console.log(course.Price)
    let x = document.getElementById("snackbar")!;
   x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

}
