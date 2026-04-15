import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
 import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/authService';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule, 
    MatMenuModule, 
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public authService = AuthService;

  constructor (private router : Router){}
 
  Dologout(){
    AuthService.logout();
    this.router.navigate(['/login']);
  }
}
