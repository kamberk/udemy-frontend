import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-approove',
  templateUrl: './approove.component.html',
  styleUrls: ['./approove.component.css']
})
export class ApprooveComponent implements OnInit {


  approoveForm!: FormGroup
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', `Bearer  ${this.token}`)

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.auth.setVisibility()
    this.approoveForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    this.http.put('http://64.227.98.119/api/users/private/change', JSON.stringify(this.approoveForm.value), {'headers': this.headers}).subscribe(
      res => {
        console.log(res)
        this.auth.removeVisibility();
        this.snackbar.open('Role change succes!', 'Close!', {
          duration: 3000,
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  logout() {
    this.auth.deauthenticate()
    localStorage.clear()
    this.router.navigate(["/login"])
  }

}
