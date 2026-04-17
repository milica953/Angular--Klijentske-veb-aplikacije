import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/authService';
import { OrderModel } from '../../models/orderModel';
import { DataService } from '../services/dataService';
import { Route, Router } from '@angular/router';
import { Utils } from '../utils';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatTableModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  airlines = DataService.getAirlines()
  types = DataService.getSeatingTypes()
  displayedColumns = ['destination', 'schecueld'];
  
  constructor(public router : Router, public utils : Utils){
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }
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
}

