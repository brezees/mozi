import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { GENRE_OPTIONS } from '../../pipes/genre.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private firestore = inject(Firestore);
  private router = inject(Router);

  genreOptions = GENRE_OPTIONS;

  movieForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      title: [''],
      description: [''],
      releaseDate: [''],
      duration: [0],
      posterUrl: [''],
      genre: [[]]  
    });
  }

  addMovie() {
    const movie: Movie = this.movieForm.value;
    const movieId = crypto.randomUUID();
    const movieDoc = doc(this.firestore, 'movies', movieId);
    setDoc(movieDoc, { ...movie, id: movieId }).then(() => {
      this.movieForm.reset({ genre: [] });
      alert('Film sikeresen hozzáadva!');
    });
  }

  goBack() {
    this.router.navigate(['/admin_choose']);
  }
}
