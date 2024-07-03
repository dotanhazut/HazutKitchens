import { Component } from '@angular/core';
import { DataService } from "../../services/dataService";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  styleUrl: './SignUp.css',
  providers: [DataService]
})
export class SignUpComponent {
  customer = { name: '', email: '' };

  constructor(private customerService: DataService, private router: Router) { }

  onSubmit() {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (data) => {
        console.log('Customer added:', data);
        // Optionally, reset the form or show a success message
        this.customer = { name: '', email: '' };
        alert("Great! Now you can login and purchase our items");
        this.redirectToLogin();
      },
      error: (err) => {
        console.error('Error adding customer', err);
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
