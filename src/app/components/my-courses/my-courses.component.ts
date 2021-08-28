import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Version } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { CourseService } from 'src/app/course.service';
import {Courses} from './courses';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
    version = Version;
   user: any;
   token = localStorage.getItem('token');
   courses: any;
   kurs: any;
   role = localStorage.getItem('role');
   message: any;
   duzina: any;
   searchTerm!: string;
   term!: string;
  
   items: Courses[] = [];
   headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private courseService: CourseService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
   this.user = this.auth.getProfile()
   if(this.role != 'student' ) {
    this.http.get('http://64.227.98.119/api/courses/teacher/my', {'headers': this.headers}).subscribe(
      (res: any) => {
        console.log(res.courses.length)
        this.courses = res.courses;
        this.duzina = res.courses.length;
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
              this.items.push(this.kurs)
            }

          }
          
         }
         this.courses = this.items
         console.log(this.courses)
       }
     )
   }
  }

  openDialog(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete Course?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    })
    const snack = this.snackBar.open('Deleting course?', 'Close', {
      duration: 3000,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        this.http.delete('http://64.227.98.119/api/courses/teacher/delete/' + id, {'headers': this.headers}).subscribe(
          (res: any) => {
            console.log(res.ok)
            this.message = res.ok
          },
          err => {
            console.log(err)
          }
        )
        snack.dismiss();
        this.snackBar.open('Course deleted!', 'Close!', {
          duration: 2000,
        });
        this.router.navigate(['/home'])
      }
    });

  }
  

  startCourse(id: any) {
    this.courseService.setID(id);
    this.router.navigate(['/course-page'])
  }

  Update(id: any) {
    this.courseService.setCourseID(id)
    this.router.navigate(['/update'])
  }

}
