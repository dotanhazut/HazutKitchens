// src/app/components/header/header.component.ts
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/dataService';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

interface MenuItem {
  label: string;
  path: string;
  visible: () => boolean;
}

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
  menuItems: MenuItem[];

  constructor(private dataService: DataService) {
    this.menuItems = [
      { label: 'Home', path: '/home', visible: () => true },
      { label: 'Products', path: '/products', visible: () => true },
      { label: 'Sign Up', path: '/signUp', visible: () => !this.dataService.isLogged.getValue() },
      { label: 'Admin', path: '/admin', visible: () => this.dataService.isAdmin.getValue() },
      { label: 'login', path: '/login', visible: () => !this.dataService.isLogged.getValue() }
    ];
  }
}
