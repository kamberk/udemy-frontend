import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm!: FormGroup;

  
  eror: any;
  profileInfo: any;
  token: any;

  headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer {this.token}');
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cookie: CookieService
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
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    this.http.post('http://64.227.98.119/api/users/login', JSON.stringify(this.loginForm.value)).subscribe(
      (res:any) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        this.authService.authenticate(res.token);
        this.cookie.set('token', res.token);
        this.router.navigate(['/']);
      },
      err=>{
        this.eror = err.error.error;
        console.log(err.error.error);
      }
    )

    console.log(JSON.stringify(this.loginForm.value));
    this.showSpinner();
    this.loginForm.reset();

  }

}
