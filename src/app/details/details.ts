import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
import { flightModel } from '../../models/flightModel';
import { Utils } from '../utils';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/authService';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public authService = AuthService;
  
  flight = signal<flightModel | null>(null)

  constructor(route: ActivatedRoute, public utils: Utils, private sanitizer: DomSanitizer) {
    route.params.subscribe(params => {
      const id = params['id'];
      axios.get(`https://flight.pequla.com/api/flight/${id}`)
        .then(rsp => this.flight.set(rsp.data))
    }

    );
  }

  getMapUrl(destination: string): SafeResourceUrl {
    const encoded = encodeURIComponent(destination);
    const url = `https://www.google.com/maps?q=${encoded}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
