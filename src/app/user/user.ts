import { Component, signal } from '@angular/core';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FlightService } from '../services/flightService';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatInputModule, MatAnchor, MatButtonModule, MatIconModule,FormsModule, MatSelectModule, Loading],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser();
  destination = signal<string[]>([]);

    constructor (private router : Router){
      if(!AuthService.getActiveUser()){
        router.navigate(['/login'])
        return
      }
      FlightService.getDestinations()
      .then(rsp=>this.destination.set(rsp.data))
    }

    UpdateUser(){
      AuthService.updateActiveUser(this.activeUser!);
      alert('User updated successfully!');
    }
  }

