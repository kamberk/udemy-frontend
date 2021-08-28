import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'udemy-frontend';

  visibility: any;
  role: any;
  user: any;
  
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  constructor( 
    private auth: AuthenticationService,
    private http: HttpClient,
    private router: Router
   ){
  }

  ngOnInit(): void {
    if(this.token != undefined) {
      this.http.get('http://64.227.98.119/api/users/private/me', {'headers': this.headers}).subscribe(
        (res: any) => {
          // this.cookieService.set('profile', res.userProfile);
          console.log(res.userProfile);
          this.user = res.userProfile;
          console.log(this.user.role)
          this.role = this.user.role;
          if (this.user.role == 'admin') {
            this.visibility = false;
            this.router.navigate(['/approove']);
          }
          this.auth.setRole(res.userProfile.role);
          localStorage.setItem('role', this.user.role)
          this.auth.setProfile(res.userProfile);
          this.auth.authenticate(res.token);
        },
        err => {
          console.log(err)
        }
      );
     }


    this.visibility = this.auth.getVisibility();
  }

}
