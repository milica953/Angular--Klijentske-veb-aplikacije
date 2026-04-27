import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Details } from './details/details';
import { Login } from './login/login';
import { User } from './user/user';
import { Order } from './order/order';
import { Cart } from './cart/cart';
import { Signup } from './singup/singup';

export const routes: Routes = [
    {path: '', component: Home },
    {path: 'about', component: About},
    {path: 'details/:id/order', component: Order},
    {path: 'details/:id', component: Details},
    {path: 'login', component: Login},
    {path: 'user', component: User},
    {path: 'cart', component: Cart},
    {path: 'singup', component: Signup}

];
// Rute definišu koja komponenta se prikazuje za koji URL.
// kad odem na /about
// prikaži AboutComponent u <router-outlet>
// odnosno
//korisnik ode na /about
// Angular pogleda routes
// nađe odgovarajući path
// ubaci tu komponentu u:
// <router-outlet></router-outlet>
// klik bez logike → routerLink
// klik + logika → navigate()