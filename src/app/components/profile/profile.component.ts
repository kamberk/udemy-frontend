import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  constructor(
    public auth: AuthenticationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if(this.token != undefined) {
      this.http.get('http://64.227.98.119/api/users/private/me', {'headers': this.headers}).subscribe(
        (res: any) => {
          // this.cookieService.set('profile', res.userProfile);
          console.log(res.userProfile);
          this.user = res.userProfile;
          console.log(this.user.role)
        },
        err => {
          console.log(err)
        }
      );
     }
  }

}
