import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartItems: any;
  user: any;
  role: any;

  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');


  constructor(
    public AuthenticationService: AuthenticationService,
    public cart: CartService,
    private http: HttpClient,
    private router: Router
  ) { }


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
            this.router.navigate(['/approove']);
          }
          this.AuthenticationService.setRole(res.userProfile.role);
          localStorage.setItem('role', this.user.role)
          this.AuthenticationService.setProfile(res.userProfile);
          this.AuthenticationService.authenticate(res.token);
        },
        err => {
          console.log(err)
        }
      );
     }
    this.cartItems = this.cart.getItems();
  }

  logout() {
    this.AuthenticationService.deauthenticate();
    localStorage.clear();
  }

}
