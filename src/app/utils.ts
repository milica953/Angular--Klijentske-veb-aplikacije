import { Injectable } from '@angular/core';
import { flightModel } from '../models/flightModel';
import { OrderModel } from '../models/orderModel';
import { DataService } from './services/dataService';

@Injectable({
  providedIn: 'root',
})

/*
  @Injectable u Angularu znači da je klasa spremna da bude ubacena (injectovana) u druge delove aplikacije, najčešće u komponente ili druge servise.
  Kada napišeš @Injectable({ providedIn: 'root' }), kažeš Angularu da napravi jednu globalnu instancu tog servisa i da je deli kroz celu aplikaciju.
*/
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

  getImageUrl(flight: flightModel) {
    const fileName = flight.destination.split('')[0].toLowerCase()
    return `https://img.pequla.com/destination/$(fileName}.jpg`
  }

  calculateTotal(order: OrderModel) {
    const seatingCost = DataService.getSeatingTypeById(order.seatingTypeId).price
    const airlineImpact = DataService.getAirlineById(order.airlineId).priceImpact
    return (seatingCost * airlineImpact * order.count) / (order.ageGroup == 'c' ? 2 : 1)
  }

}
/*
  API URL → environment
  API pozivi → service
  user/session → AuthService
  prikaz → component
  pomoćne funkcije → utils
“Da li ovo treba svuda?” → core
“Da li je vezano za jedan feature?” → features
“Da li je samo helper funkcija?” → utils
“Da li prikazujem UI?” → component
*/ 