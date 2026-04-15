import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatAnchor, MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, MatAnchor, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
