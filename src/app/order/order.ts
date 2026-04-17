import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Loading } from '../loading/loading';
import { Utils } from '../utils';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { flightModel } from '../../models/flightModel';
import { DataService } from '../services/dataService';
import { OrderModel } from '../../models/orderModel';
import { AuthService } from '../services/authService';
import { FlightService } from '../services/flightService';
import { Alert } from '../alerts';

@Component({
  selector: 'app-order',
  imports: [
    MatCardModule,
    FormsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    Loading,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  flight = signal<flightModel | null>(null)
  airlines = DataService.getAirlines()
  seatingTypes = DataService.getSeatingTypes()

  order: Partial<OrderModel> = {
    airlineId: this.airlines[0].id,
    seatingTypeId: this.seatingTypes[0].id,
    ageGroup: 'a',
    count: 1
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public utils: Utils
  ) {
    if (!AuthService.getActiveUser()) {
      this.router.navigate(['/login'])
      return
    }

    this.route.params.subscribe(params => {
      const id = Number(params['id'])
      FlightService.getFlightById(id)
        .then(rsp => {
          this.flight.set(rsp.data)
        })
    })
  }

  calculateTotal() {
    return this.utils.calculateTotal(this.order as any)
  }

  placeOrder() {
    Alert.confirm(`Are you sure you want to place the order for ${this.calculateTotal()} EUR?`, () => {
      AuthService.createOrder(this.order, this.flight()!)
      this.router.navigate(['/cart'])
    })
  }
}