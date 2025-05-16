import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="contact-card">
      <h2 class="title">Kapcsolat</h2>
      <p class="intro">Ha bármilyen kérdése van, kérjük keressen minket az alábbi elérhetőségeken:</p>
      <ul class="contact-list">
        <li><mat-icon>email</mat-icon>info&#64;moziszte.hu</li>
        <li><mat-icon>phone</mat-icon>+36 1 234 5678</li>
      </ul>
    </mat-card>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {}
