import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-graphic-design',
  templateUrl: './graphic-design.component.html',
  styleUrls: ['./graphic-design.component.css']
})
export class GraphicDesignComponent implements OnInit {

  role = localStorage.getItem('role');
  courses: any;
  error: any;
  searchTerm!: string;
  term!: string;

  constructor(
    private courseService: CourseService,
    private router: Router,
    public auth: AuthenticationService,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    this.courseService.getCourseByCat('graphic-design').subscribe(
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

  AddToCart(course: any) {
    this.cart.addToCart(course);
    this.cart.setPrice(course.Price);
    console.log(course.Price)
    let x = document.getElementById("snackbar")!;
   x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  seeMore(id : any) {
    localStorage.setItem('courseID', id)
    this.courseService.setCourseID(id);
    this.router.navigate(['/course-details'])
  }

}
