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
// Partial<T> --> znači: uzme sva polja iz T i doda ? (optional)
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
  /*
  Signal je jednostavan, ugrađen Angular reaktivni state koji automatski ažurira UI kada se vrednost promeni.
  BehaviorSubject je RxJS stream koji drži trenutnu vrednost i zahteva subscribe da bi se pratile promene.
  NgRx je centralizovani state management sistem za velike aplikacije koji organizuje state kroz akcije, reducer-e i selektore.
  */ 

  constructor(public router: Router) {
    FlightService.getDestinations()
      .then(rsp => this.destinations.set(rsp.data))
  }
  /*
  .then(...) znači: “kad async operacija završi, uradi ovo” (najčešće HTTP poziv).
  rsp je skraćenica za response (odgovor sa servera) — to je objekat koji dobiješ nazad iz API-ja.
  => (strelica) je arrow function — skraćena funkcija koja prima rsp i izvršava kod u jednoj liniji.
  this označava trenutnu instancu klase (npr. Angular komponentu), pa this.destinations znači “destinations u ovoj komponenti”.
  .set(rsp.data) uzima podatke iz servera i upisuje ih u signal destinations. 
  ###################################################################################
  Lambda funkcije (arrow function =>) -> (a, b) => a + b “uzmi a i b i vrati zbir” jos jedan primer 
  umesto: 
  
  function(x) {
  return x + 1;
}
  -------------------------------> ovo je lambda
  x => x + 1 (“uzmi x i vrati x + 1”)
  ternary operator (skraćeni if/else). -> condition ? vrednost_ako_je_true : vrednost_ako_je_false;
*/

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