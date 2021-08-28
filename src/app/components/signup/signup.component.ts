import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;

  signupForm!: FormGroup;

  roles: string[] = ['student', 'teacher'];
  choosenRole: any;
  eror: any;

  headers= new HttpHeaders()
  .set('Content-Type', 'application/json');

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authentication: AuthenticationService
  ) { }

  showSpinner() {
    this.spinner.show(undefined, { fullScreen: true, 
                                  bdColor: "rgba(0, 0, 0, 0.8)", 
                                  size: "large", 
                                  color: "#fff", 
                                  type: "square-jelly-box"});
    setTimeout(() => {
      this.spinner.hide();
    }, 1050);
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(){
    this.http.post('http://64.227.98.119/api/users/signup', JSON.stringify(this.signupForm.value)).subscribe(
      (res:any) => {
        console.log(res.resetCode);
        this.authentication.setCode(res.resetCode);
        this.router.navigate(['/remember-code']);
        this.showSpinner();
      },
      err=>{
        console.log(err.error.error);
        this.eror = err.error.error;
      }
    )

    this.showSpinner();
    this.signupForm.reset();
  }

}