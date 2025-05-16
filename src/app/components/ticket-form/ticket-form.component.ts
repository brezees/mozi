import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  form: FormGroup;
  selectedMovie?: Movie;
  firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  router = inject(Router);

  loading = true;
  errorMessage = '';

  showSuccess = false;
  successMessage = '';

  ticketTypes = [
    { label: 'Felnőtt', value: 'adult', price: 2000 },
    { label: 'Diák/Nyugdíjas', value: 'student', price: 1500 },
    { label: 'Gyerek', value: 'child', price: 1000 }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tickets: this.fb.group({
        adult: [0, [Validators.min(0)]],
        student: [0, [Validators.min(0)]],
        child: [0, [Validators.min(0)]]
      }),
      paymentMethod: ['local', Validators.required]
    }, { validators: this.atLeastOneTicket });
  }

  async ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('movieId');
    if (movieId) {
      try {
        const movieDocRef = doc(this.firestore, 'movies', movieId);
        const movieSnap = await getDoc(movieDocRef);
        if (movieSnap.exists()) {
          this.selectedMovie = movieSnap.data() as Movie;
          this.selectedMovie.id = movieId;
        } else {
          this.errorMessage = 'Nem található a kiválasztott film.';
        }
      } catch (error) {
        this.errorMessage = 'Hiba történt a film betöltése közben.';
      }
    } else {
      this.errorMessage = 'Érvénytelen filmazonosító.';
    }
    this.loading = false;
  }

  atLeastOneTicket(group: FormGroup) {
    const tickets = group.get('tickets')?.value as { [key: string]: number } | undefined;
    if (!tickets) return null;
    const total = Object.values(tickets).reduce((acc, val) => acc + (val || 0), 0);
    return total > 0 ? null : { noTicketsSelected: true };
  }

  getTotalPrice(): number {
    const tickets = this.form.get('tickets')?.value as { [key: string]: number } | undefined;
    if (!tickets) return 0;
    return this.ticketTypes.reduce((sum, type) => {
      const count = tickets[type.value] || 0;
      return sum + count * type.price;
    }, 0);
  }

  onSubmit() {
    if (this.form.valid && this.selectedMovie) {
      const paymentMethod = this.form.value.paymentMethod;

      if (paymentMethod === 'local') {
        this.successMessage = 'Sikeres rendelés! A helyszínen készpénzzel vagy kártyával fizethet.';
        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000); 

      } else {
        this.successMessage = 'Sikeres vásárlás! Hamarosan átirányítunk a fizetés oldalra.';
        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }

      this.form.reset({
        name: '',
        email: '',
        tickets: {
          adult: 0,
          student: 0,
          child: 0
        },
        paymentMethod: 'local'
      });

    } else {
      this.form.markAllAsTouched();
    }
  }
}
