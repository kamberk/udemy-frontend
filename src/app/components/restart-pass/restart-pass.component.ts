import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-restart-pass',
  templateUrl: './restart-pass.component.html',
  styleUrls: ['./restart-pass.component.css']
})
export class RestartPassComponent implements OnInit {

  user: any;
  token = localStorage.getItem('token');
  resetForm = this.formBuilder.group({
    resetCode: '',
    newPassword: ''
  });
  eror: any;
  profileInfo: any;
  message: any;

  headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', `Bearer  ${this.token}`);

  constructor(
    public auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cookies: CookieService,
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getProfile();
  }


  onSubmit(){
    this.http.put('http://64.227.98.119/api/users/private/password/reset', JSON.stringify(this.resetForm.value), {'headers': this.headers}).subscribe(
      (res: any) => {
        console.log(res)
        this.message = res.ok;
      },
      err => {
        this.eror = err.error.error
        console.log(err.error.error)
      }
    )
  }

}
