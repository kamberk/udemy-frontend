import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  courses = this.cart.getItems();
  price: any;
  totalPrice = 0;
  courseExist = false;

  constructor(
    private cart: CartService
  ) { }

  ngOnInit(): void {
    console.log(this.cart.getItems());
    this.price = this.cart.getPrice();
    if(this.price != 0) {
      this.courseExist = true;
    }
    console.log(this.price)
  }

}
