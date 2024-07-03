// src/app/views/log-in/log-in.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataService';
import {AdminComponent} from "../admin/admin.component";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule // הוסף את זה אם הקומפוננטה standalone
  ],
  styleUrls: ['./log-in.component.css'],
  providers: [DataService]
})
export class LoginComponent {
  username: string | undefined;
  email: string | undefined;
  is_admin:boolean = false;

  constructor(private router: Router, private dataService: DataService) { }

  onLogin() {
    console.log('Attempting to log in with:', this.username, this.email);
    const res = this.dataService.login(this.username, this.email).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        console.log("is admin",response.success);
        if(response.success){
          if (response.user.is_admin) {
            DataService.isAdmin.next(true);
          }
          DataService.isLogged.next(true);
          DataService.email.next(response.user.email);
        }
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed please try again or sign up');
      }
    });
  }

  onSingUp() {
    this.router.navigate(['/signUp']);
  }
}
