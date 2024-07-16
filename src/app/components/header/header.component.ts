// src/app/components/header/header.component.ts
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../services/dataService';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf,
    NgForOf,
    CommonModule, HttpClientModule, FormsModule
  ],
  standalone: true,
  styleUrl: './header.component.css',
  providers: [DataService]
})
export class HeaderComponent {
  menuItems = [
    { label: 'Home', path: '/home', visible: () => true },
    { label: 'Products', path: '/products', visible: () => true },
    { label: 'Sign Up', path: '/signUp', visible: () => !DataService.isLogged.getValue() },
    { label: 'Login', path: '/login', visible: () => !DataService.isLogged.getValue() },
    { label: 'Events', path: '/events', visible: () => true },
    { label: 'Admin', path: '/admin', visible: () => DataService.isAdmin.getValue() }
  ];

  constructor() {}

}
