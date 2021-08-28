import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticated = new BehaviorSubject<boolean>(this.cookieService.check('token'));
  
  rememberCode: any;
  userProfile: any;
  role: any;
  visibility: any;


  constructor(
    private cookieService: CookieService
  ) { 
    
   }
  public authenticate(token: string) {
    this.authenticated.next(true);
  }

  public deauthenticate() {
    this.authenticated.next(false);
    this.cookieService.delete('token');
    localStorage.clear();
  }

  public setVisibility(){
    this.visibility = false;
  }
  
  public removeVisibility() {
    this.visibility = true;
  }

  public getVisibility(){
    return this.visibility;
  }

  public setCode(code: number){
    this.rememberCode = code;
  }
  

  public getCode() {
    return this.rememberCode;
  }

  public setProfile(userProf: any){
    this.userProfile = userProf;
  }

  public getProfile(){
    return this.userProfile;
  }

  public setRole(role: string) {
    this.role = role;
  }

  public getRole() {
    return this.role;
  }
}
