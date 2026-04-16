import { Component, signal } from '@angular/core';
import { flightModel } from '../../models/flightModel';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Utils } from '../utils';
import {MatIconModule} from '@angular/material/icon'; 
import { AuthService } from '../services/authService';
import { FlightService } from '../services/flightService';
import { Loading } from '../loading/loading';



@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, Loading],
  templateUrl: './home.html',
  styleUrl: './home.css',
  
})
export class Home {
  
  public authService = AuthService
  flights = signal<flightModel[]>([])

  constructor(public utils: Utils) {
    localStorage.setItem('time',JSON.stringify(new Date().toISOString()));

    FlightService.getFlights()
    .then(rsp=>{
      const sorted = rsp.data.sort((f1, f2) => new Date(f1.scheduledAt).getTime() - new Date(f2.scheduledAt).getTime());
      this.flights.set(sorted);
    });
  }
}
