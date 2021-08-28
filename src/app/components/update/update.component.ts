import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/authentication.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  eror: any;
  message: any;
  id: any;
  isCompleted = false;
  categories: string[] = ['web-dev', 'programming', 'graphic-design'];

  user: any;
  createCourseForm!: FormGroup;
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getProfile();
    localStorage.setItem('name', JSON.stringify(this.user.name));
      this.id = this.courseService.getCourseID();

    this.createCourseForm = this.formBuilder.group({
      id: this.id,
      title: '',
      description: '',
      price: '',
      image: '',
      link: '',
      author: `${localStorage.getItem('name')}`,
    });
  }
  showSpinner() {
    this.spinner.show(undefined, { fullScreen: true, 
      bdColor: "rgba(0, 0, 0, 0.8)", 
                                size: "large", 
                                color: "#fff", 
                                type: "square-jelly-box"});
                                setTimeout(() => {
                                  this.spinner.hide();
                                }, 2000);
                              }

                              onSubmit() {

                                console.log(this.createCourseForm.value);
                                console.log(JSON.stringify(this.createCourseForm.value));
                                this.showSpinner();
                                const snack = this.snackbar.open('Course Created', 'Close', {
                                  duration: 3000,
                                });
                            
                                this.http.put('http://64.227.98.119/api/courses/teacher/update/' + this.id, JSON.stringify(this.createCourseForm.value), {'headers': this.headers}).subscribe(
                                  (res: any) => {
                                    console.log(res.ok);
                                    this.message = res.ok;
                                    this.snackBar.open('Course deleted!', 'Close!', {
                                      duration: 4000,
                                    });
                                    this.router.navigate(['/home'])
                                  },
                                  err => {
                                    console.log(err);
                                    this.eror = err.statusText;
                                  }
                                );
                                  
                                
                            
                            
                                this.createCourseForm.reset();
                                
                              }

}
