import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/cart.service';
import { Courses } from './courses';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  price: any;
  eror: any;
  message: any;
  items: Courses[] = [];
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer  ${this.token}`)
  .set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private cart: CartService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.price = this.cart.getPrice() -10;
    this.items = this.cart.getItems();
  }

  showSpinner() {
    this.spinner.show(undefined, { fullScreen: true, 
      bdColor: "rgba(0, 0, 0, 0.8)", 
                                size: "large", 
                                color: "#fff", 
                                type: "square-jelly-box"});
                                setTimeout(() => {
                                  this.spinner.hide();
                                }, 2000);
                              }

  pay() {
    console.log(this.items)
    this.showSpinner()
    this.http.post('http://64.227.98.119/api/courses/student/order', {"courses": this.items, "totalPrice": this.price}, {'headers': this.headers}).subscribe(
      (res: any) => {
        console.log(res)
        this.message = res.ok
        this.router.navigate(['/thank-you'])
      },
      err => {
        console.log(err.error.error);
        this.eror = err.error.error
      }
    )

  }

}
