import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
 /* 
    Ovo je korena komponenta stranice about.
    U korenu komponentu ide logika odnosno backend, izvlacenje podataka, pravljenje f-ja, i onda samo izvrsimo prikaz u htmlu
    pozivaš servis (backend/API)
    U htmlu moze da ide if, for, binding → {{ data }},  ali biznis logika ide u korenu komponetu, 
    Ako u HTML-u krenem da pišem kompleksnu logiku (npr. dugački izrazi, puno uslova): onda se to prebacuje u f-ju u ts-u i 
    samo se pozove f-ja u htmlu.
    
 */ 