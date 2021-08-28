import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `],
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  closeResult: string | undefined;
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  user: any;
  editForm = this.formBuilder.group({
    name: '',
    surname: '',
    image: ''
  });
  eror: any;
  message: any;


  constructor(
    public auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal
  ) { }

  onSubmit(){
    // console.log(JSON.stringify(this.editForm.value));
    this.http.put('http://64.227.98.119/api/users/private/profile/edit', JSON.stringify(this.editForm.value), {'headers': this.headers}).subscribe(
     (res: any) => {
       console.log(res)
       this.message = res.ok;
     },
     err => {
        console.log(err);
        this.eror = err.error.error;
      }
   )
  }

  ngOnInit(): void {
   this.user = this.auth.getProfile();
   
  }

}
