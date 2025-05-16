import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() homeClick = new EventEmitter<void>();
  @Output() contactClick = new EventEmitter<void>();
  @Output() loginClick = new EventEmitter<void>();
  @Output() adminClick = new EventEmitter<void>();

  isMobile: boolean = false;
  menuOpen: boolean = false;

  constructor() {
    this.isMobile = window.innerWidth < 768; 
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.menuOpen = false; 
    }
  }
}
