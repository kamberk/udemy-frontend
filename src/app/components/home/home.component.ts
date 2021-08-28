import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubscriptionLike } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { CartService } from 'src/app/cart.service';
import { CourseService } from 'src/app/course.service';
import { Courses } from '../../courses';
import { CoursesHome } from './courses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  purchased = false;
  created = false;
  kurs: any;
  kursevi: CoursesHome[] = [];
  bought: number[] = [];
  kupljen: Array<number> = [];
  kupljen2: Array<number> = [];
  zbir: any;

  totalLength: any;
  page: number =1;

  role = localStorage.getItem('role');
  user: any;
  courses: any;
  coursesHome: any;
  coursesHome2: any;
  loggedIn: any;
  createdAt: any;
  programmingCourses: any;
  graphCourses: any;
  webDevCourses: any;
  subscription: SubscriptionLike | undefined;
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');
  searchTerm!: string;
  term!: string;

  constructor(
    public auth: AuthenticationService,
    private http: HttpClient,
    private cookieService: CookieService,
    private courseService: CourseService,
    private router: Router,
    public cart: CartService
  ) { }

  async ngOnInit() {
    
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    if(!this.token){
      this.loggedIn = false
    } else {
      this.loggedIn = true
    }

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

    this.user = this.auth.getProfile();

    await this.courseService.getCourses().subscribe(
      (res: any) => {
        console.log(res.courses.length);
        // this.length = res.courses.length
        this.totalLength = res.courses.length
        console.log(res.courses);
        this.courses = res.courses;
      },
      err => {
        console.log(err);
      }
    );
    

    this.courseService.getCourseByCat('programming').subscribe(
      (res: any) => {
        console.log(res.courses.length)
        this.programmingCourses = res.courses
      },
      err => {
        console.log(err);
      }
    );

    this.courseService.getCourseByCat('graphic-design').subscribe(
      (res: any) => {
        console.log(res.courses.length)
        this.graphCourses = res.courses
      },
      err => {
        console.log(err);
      }
    );

    this.courseService.getCourseByCat('web-dev').subscribe(
      (res: any) => {
        // console.log(res.courses)
        this.webDevCourses = res.courses
      },
      err => {
        console.log(err);
      }
    );
  }

  seeMore(productId: any) {
    console.log(productId)
    localStorage.setItem('courseID', productId)
    this.courseService.setCourseID(productId);
    this.router.navigate(['/course-details'])
  }

  AddToCart(course: Courses){
    this.cart.addToCart(course);
    this.cart.setPrice(course.Price);
    console.log(course.Price)
    let x = document.getElementById("snackbar")!;
   x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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

  startCourse(id: any) {
    this.courseService.setID(id);
    this.router.navigate(['/course-page'])
  }

}
