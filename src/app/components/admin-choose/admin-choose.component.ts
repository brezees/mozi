import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';  

@Component({
  selector: 'app-admin-choose',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin-choose.component.html',
  styleUrls: ['./admin-choose.component.scss']
})
export class AdminChooseComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
