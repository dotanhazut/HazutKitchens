import {Component} from '@angular/core';
import {DataService} from "../../services/dataService";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  styleUrl: './SignUp.css',
  providers: [DataService]
})
export class SignUpComponent{
  customer = { name: '', email: '' };

  constructor(private customerService: DataService) { }

  onSubmit() {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (data) => {
        console.log('Customer added:', data);
        // Optionally, reset the form or show a success message
        this.customer = { name: '', email: '' };
      },
      error: (err) => {
        console.error('Error adding customer', err);
      }
    });
  }
}

