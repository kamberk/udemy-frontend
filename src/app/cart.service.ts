import { Injectable } from '@angular/core';
import { Courses } from './courses';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Courses[] = [];
  totalPrice = 0;

  addToCart(course: Courses){
    this.items.push(course);
  }

  getItems() {
    return this.items
  }

  setPrice(price: number){
    this.totalPrice += price;
  }

  getPrice(){
    return this.totalPrice
  }

  clearCart() {
    this.items = [];
    return this.items
  }

  constructor() { }
}
