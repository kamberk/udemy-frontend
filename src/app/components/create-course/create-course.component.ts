import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  styles: [`
    :host >>> .alert-custom {
      color: #99004d;
      background-color: #f169b4;
      border-color: #800040;
    }
  `]
})

export class CreateCourseComponent implements OnInit {

  eror: any;
  message: any;
  isCompleted = false;
  categories: string[] = ['web-dev', 'programming', 'graphic-design'];

  createCourseForm!: FormGroup;

  


  token = localStorage.getItem('token');
  
  user: any;
  
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.createCourseForm = this.formBuilder.group({
        title: '',
        description: '',
        price: '',
        image: '',
        link: '',
        author: `${localStorage.getItem('name')}`,
        category: '',
      });
      this.user = this.auth.getProfile();
      localStorage.setItem('name', JSON.stringify(this.user.name));
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

    this.http.post('http://64.227.98.119/api/courses/teacher/create', JSON.stringify(this.createCourseForm.value), {'headers': this.headers}).subscribe(
      (res: any) => {
        console.log(res.ok);
        this.message = res.ok;
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
