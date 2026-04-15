import { Component, signal } from '@angular/core';
import axios from 'axios';
import { flightModel } from '../../models/flightModel';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Utils } from '../utils';
import {MatIconModule} from '@angular/material/icon'; 
import { AuthService } from '../services/authService';



@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  
})
export class Home {
  
  public authService = AuthService
  flights = signal<flightModel[]>([])

  constructor(public utils: Utils) {
    localStorage.setItem('time',JSON.stringify(new Date().toISOString()));

    axios.get<flightModel[]>('https://flight.pequla.com/api/flight/list?type=departure')
    .then(rsp=>{
      const sorted = rsp.data.sort((f1, f2) => new Date(f1.scheduledAt).getTime() - new Date(f2.scheduledAt).getTime());
      this.flights.set(sorted);
    });
  }
}
