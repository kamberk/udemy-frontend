import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/cart.service';
import { CourseService } from 'src/app/course.service';
import { Courses } from '../../courses';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-course-detalis',
  templateUrl: './course-detalis.component.html',
  styleUrls: ['./course-detalis.component.css'],
  providers: [NgbRatingConfig],
    styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    .bad {
      color: #deb0b0;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class CourseDetalisComponent implements OnInit {


  course: any;
  clicked = false;
  rating: any;
  readonly = false;
  currentRate: any;
  courseID: any;
  isti = false;
  authen: any;
  postoji:number = 0;

  role: any;
  coursesHome: any;
  kurs: any;
  kursevi: any[] = [];
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  constructor(
    public auth: AuthenticationService,
    public courseService: CourseService,
    private cart: CartService,
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
   }

  async ngOnInit() {

    if(!this.token){
      console.log("no user...")
    } else {
      this.authen = true
    }
    console.log(this.authen)
    this.role = await localStorage.getItem('role');
    console.log(this.role)

    if(!this.token){
      console.log("no user...")
    } else {
      //Uzimam kurseve da uporedim je li kupljen ili ne
      if(this.role != 'student' ) {
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
             let courseLength = res.orders[0].Courses.length;
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
           }
         )
       }
    }
    
    this.courseID = this.courseService.getCourseID();
    console.log(this.courseID)

    //Uzimam kurs i prikazujem ga na stranici
    this.courseService.getCourse().subscribe(
      (res: any) => {
        console.log(res.course)
        this.course = res.course.Course
        this.currentRate = res.course.Rating;
        this.rating = res.course.Rating;
        console.log(this.currentRate);
        if(!this.token){
          console.log("no user...")
        } else {
          for(let i=0; i < this.coursesHome.length; i++) {
            if(this.course.ID == this.coursesHome[i].ID) {
              console.log("ID je isti " + this.coursesHome[i].ID + " && " + this.course.ID)
              this.isti = true;
              this.postoji = this.course.ID
            }
            else {
              console.log("ID nije isti " + this.coursesHome[i].ID + " && " + this.course.ID)
              this.isti = false
            }
          }
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  startCourse(id: any) {
    this.courseService.setID(id);
    this.router.navigate(['/course-page'])
  }

  openSnackBar(message: string, action: string, course: any) {
    this._snackBar.open(message, action);
    this.cart.addToCart(course);
    this.cart.setPrice(course.Price);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
