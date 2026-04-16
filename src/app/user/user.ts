import { Component, signal } from '@angular/core';
import { AuthService } from '../services/authService';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FlightService } from '../services/flightService';
import { Loading } from '../loading/loading';
import Swal from 'sweetalert2'
import { Alert } from '../alerts';
import { flightModel } from '../../models/flightModel';
import { MatListModule } from '@angular/material/list';
import { Utils } from '../utils';


@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatInputModule, MatAnchor, MatButtonModule, MatIconModule, FormsModule, MatSelectModule, Loading, MatListModule, RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser();
  destination = signal<string[]>([]);
  recommended = signal<flightModel[]>([])
  oldPassword = ''
  newPassword = ''
  passRepeat = ''


  constructor(private router: Router, public utils: Utils) {

    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }
    FlightService.getDestinations()
      .then(rsp => this.destination.set(rsp.data))

    FlightService.getFlightsToDestination(this.activeUser!.destination)
      .then(rsp => this.recommended.set(rsp.data.content))
  }

  UpdateUser() {
    Alert.confirm('are you sure that you want to update user data',
      () => {
        AuthService.updateActiveUser(this.activeUser!)
        Alert.success('user updated successfully.')
      })
  }


  UpdatePassword() {
    if (this.oldPassword != this.activeUser?.password) {
      Alert.loginEror('invalid password.')
      return
    }
    if (this.newPassword.length < 6) {
      Alert.loginEror('password must have at least 6 charachters')
      return
    }

    if (this.newPassword != this.passRepeat) {
      Alert.loginEror('password dont mattch.')
      return
    }
    if (this.newPassword === this.activeUser.password) {
      Alert.loginEror('password cant be same as the old one.')
      return
    }

    Alert.confirm('are you sure that you want to change password',
      () => {
        AuthService.updatePassword(this.newPassword)
        Alert.success('password changed.')
        AuthService.logout()
        this.router.navigate(['/login'])

      })


  }
}

