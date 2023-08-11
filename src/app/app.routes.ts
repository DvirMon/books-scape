import { Routes } from '@angular/router';
import { PnfComponent } from './pages/pnf/pnf.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { cartGuard } from './pages/cart/cart.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'cart', component: CartComponent,
    canActivate : [cartGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home` path by default
  { path: '**', component: PnfComponent } // wildcard route, should be last in the array
];


