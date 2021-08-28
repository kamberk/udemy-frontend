import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-remember-code',
  templateUrl: './remember-code.component.html',
  styleUrls: ['./remember-code.component.css']
})
export class RememberCodeComponent implements OnInit {

  code: any;

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.code = this.authentication.getCode();
  }

}
