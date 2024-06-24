import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';  // Import the Home component
import {ProductsComponent} from "./views/products/products.component";
import {SignUpComponent} from "./views/signUp/signUp.component";



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect to /home
  { path: 'home', component: HomeComponent },  // Route for Home component
  { path: 'products', component: ProductsComponent },    // Route for Products component
  { path: 'signUp', component: SignUpComponent }
  // Add other routes here
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

