import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CoursesHome } from '../components/home/courses';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  courses: any;
  searchTerm!: string;
  term!: string;
  role = localStorage.getItem('role');
  coursesHome: any;
  kurs: any;
  kursevi: CoursesHome[] = [];
  loggedIn: any;

  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  constructor(
    private courseService: CourseService,
    private http: HttpClient,
    private cart: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.token){
      this.loggedIn = false
    } else {
      this.loggedIn = true
    }
    this.courseService.getCourses().subscribe(
      (res: any) => {
        console.log(res.courses.length);
        console.log(res.courses);
        this.courses = res.courses;
      },
      err => {
        console.log(err);
      }
    );

    //Uzimam kurseve da uporedim je li kupljen ili ne
    if(!this.token) {
      console.log("no user...")
    } else {
      if(this.role === 'teacher' ) {
        this.http.get('http://64.227.98.119/api/courses/teacher/my', {'headers': this.headers}).subscribe(
          (res: any) => {
            console.log(res.courses)
            this.coursesHome = res.courses;
          }
        )
       }
       else {
         this.http.get('http://64.227.98.119/api/courses/student/orders/me', {'headers': this.headers}).subscribe(
           (res: any) => {
             let ordersLenght = res.orders.length;
             let courseLength = res.orders[0]?.Courses.length;
             for(let i=0; i <= ordersLenght; i++) {
              let orderLenght = res?.orders[i]?.Courses?.length;
              
              for(let j=0; j <= orderLenght; j++) {
                this.kurs = res.orders[i].Courses[j]
    
                if(this.kurs != undefined) {
                  this.kursevi.push(this.kurs)
                }
    
              }
              
             }
             this.coursesHome = this.kursevi
             console.log(this.coursesHome)
           }
         )
       }
    }
  }

  AddToCart(course: any) {
    this.cart.addToCart(course);
    this.cart.setPrice(course.Price);
    console.log(course.Price)
    let x = document.getElementById("snackbar")!;
   x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  seeMore(productId: any) {
    console.log(productId)
    localStorage.setItem('courseID', productId)
    this.courseService.setCourseID(productId);
    this.router.navigate(['/course-details'])
  }

  startCourse(id: any) {
    this.courseService.setID(id);
    this.router.navigate(['/course-page'])
  }

  isBought(id: any){
    
    let isb = false;
    for(let i=0; i< this.coursesHome.length; i++) {
      if(id == this.coursesHome[i].ID) {
        isb = true;
        break
      }
    }
    return isb;
  }

}
