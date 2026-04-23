import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/authService';
import { OrderModel } from '../../models/orderModel';
import { DataService } from '../services/dataService';
import { Route, Router, RouterLink } from '@angular/router';
import { Utils } from '../utils';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Alert, matCustomClass } from '../alerts';
import { Order } from '../order/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatTableModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  airlines = DataService.getAirlines()
  types = DataService.getSeatingTypes()
  displayedColumns = ['destination', 'scheduledAt', 'flightNumber', 'airline', 'seatingType', 'ageGroup', 'count', 'options'];
  
  constructor(public router : Router, public utils : Utils){
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }
  }

  
  calculateTotal(){
    let total = 0;
    for (let order of this.getOrders()) {
      total += this.utils.calculateTotal(order)
    }
    return total
  }
  getOrdersAsJSON(){
    return JSON.stringify(this.getOrders(), null, 2)
  }
  getOrders() {
    return AuthService.getOrdersByState('w')
  }
  getPaidOrders() {
    return AuthService.getOrdersByState('p')
  }

  getCanceledOrders() {
    return AuthService.getOrdersByState('c')
  }

  getAirline(order: OrderModel) {
    return DataService.getAirlineById(order.airlineId).name
  }

  getSeatingType(order: OrderModel) {
    return DataService.getSeatingTypeById(order.seatingTypeId).name
  }

  getAgeGroup(order: OrderModel) {
    return DataService.getFullAgeGroupText(order.ageGroup)
  }
  removeOrder(order: OrderModel){
        Alert.confirm("are you sure that you want to remover ticket ?", () => AuthService.cancelOrder(order.createdAt));
        this.roloadCommponent()
  }
  payAll(){
    Alert.confirm(`are you sure that you want to pay ? your total is ${this.calculateTotal()} EUR`, () => AuthService.payOrders());
    this.roloadCommponent()
  }

  roloadCommponent(){
    const currentURL = this.router.url
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(()=> {
      this.router.navigate(['/cart'])
    })
  }

  showBarcode(order: OrderModel) {
    const barcode = new Date(order.createdAt).getTime()
    const src = `https://quickchart.io/barcode?type=code128&text=${barcode}&width=280&includeText=true`
    Swal.fire({
      title: `${order.destination} (${order.flightNumber})`,
      customClass: matCustomClass,
      html: `<img src="${src}" />`,
    })
  }
}

