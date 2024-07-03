import { Component } from '@angular/core';
import { DataService } from '../../services/dataService';  // Ensure this path is correct
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers:[DataService],
  template: `
    <form (submit)="login()">
      <input type="text" [(ngModel)]="username" name="username" placeholder="Username" required>
      <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <div *ngIf="errorMessage">{{ errorMessage }}</div>
  `
})
export class LoginnComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: DataService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.errorMessage = 'Invalid login credentials';
      }
    );
  }
}
