import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './views/products/products.component';
import {HomeComponent} from "./views/home/home.component";
import {SignUpComponent} from "./views/signUp/signUp.component";
import {AdminComponent} from "./views/admin/admin.component";
import {LoginComponent} from "./views/log-in/log-in.component";
// Define your routes here
export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},  // Redirect to /home
  {path: 'home', component: HomeComponent},  // Route for Home component
  {path: 'products', component: ProductsComponent},    // Route for Products component
  {path: 'signUp', component: SignUpComponent},
  {path: 'admin',component: AdminComponent},
  {path:'login',component: LoginComponent}
  // Add other routes here
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    // Import RouterModule and configure routes
  ],
  exports: [RouterModule]
})
export class AppModule {
}
