import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserModel } from '../../models/userModel';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/authService';
import { FlightService } from '../services/flightService';
import { Alert } from '../alerts';

@Component({
  selector: 'app-singup',
  imports: [MatCardModule, MatInputModule, MatAnchor, MatButtonModule, MatIconModule, FormsModule, MatOption, MatSelectModule, RouterLink],
  templateUrl: './singup.html',
  styleUrl: './singup.css',
})
export class Signup {
  user: Partial<UserModel> = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',
    destination: ''
  }

  repeat: string = ''
  destinations = signal<string[]>([])

  constructor(public router: Router) {
    FlightService.getDestinations()
      .then(rsp => this.destinations.set(rsp.data))
  }

  doSignup() {
    if (AuthService.existsByEmail(this.user.email!)) {
      Alert.loginEror('Email already registred!')
      return
    }

    if (this.user.firstName == '' || this.user.lastName == '' || this.user.address == '' || this.user.destination == '' || this.user.phone == '') {
      Alert.loginEror('All fields should have a value!')
      return
    }

    if (this.user.password!.length < 6) {
      Alert.loginEror('Password must be at least 6 chars long!')
      return
    }

    if (this.user.password !== this.repeat) {
      Alert.loginEror('Passwords dont match!')
      return
    }

    console.log(this.user)
    AuthService.createUser(this.user)
    this.router.navigate(['/login'])
  }
   
}