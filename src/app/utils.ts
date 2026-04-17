import { Injectable } from '@angular/core';
import { flightModel } from '../models/flightModel';
import { OrderModel } from '../models/orderModel';
import { DataService } from './services/dataService';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'

    })
  }

  getImageUrl(flight: flightModel){
    const fileName = flight.destination.split('')[0].toLowerCase()
    return `https://img.pequla.com/destination/$(fileName}.jpg`
  }

  calculateTotal(order: OrderModel) {
    const seatingCost = DataService.getSeatingTypeById(order.seatingTypeId).price
    const airlineImpact = DataService.getAirlineById(order.airlineId).priceImpact
    return (seatingCost * airlineImpact * order.count) / (order.ageGroup == 'c' ? 2 : 1)
  }

}
