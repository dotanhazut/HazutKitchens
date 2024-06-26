import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
