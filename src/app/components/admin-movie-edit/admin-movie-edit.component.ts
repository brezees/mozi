import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { Movie } from '../../models/movie.model';
import { GENRE_OPTIONS } from '../../pipes/genre.pipe'; 

@Component({
  selector: 'app-admin-movie-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule 
  ],
  templateUrl: './admin-movie-edit.component.html',
  styleUrls: ['./admin-movie-edit.component.scss']
})
export class AdminMovieEditComponent implements OnInit {
  movieId!: string;
  movie!: Movie;
  genreOptions = GENRE_OPTIONS; 

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    const movieDocRef = doc(this.firestore, `movies/${this.movieId}`);
    docData(movieDocRef, { idField: 'id' }).subscribe(data => {
      this.movie = data as Movie;
      if (!this.movie.genre) {
        this.movie.genre = [];
      }
    });
  }

  updateGenres(selectedGenres: string[]) {
    this.movie.genre = selectedGenres;
  }

  async save() {
    const movieDocRef = doc(this.firestore, `movies/${this.movieId}`);

    try {
      await updateDoc(movieDocRef, { 
        title: this.movie.title,
        description: this.movie.description,
        releaseDate: this.movie.releaseDate,
        genre: this.movie.genre,
        duration: this.movie.duration,
        posterUrl: this.movie.posterUrl
      });
      alert('Film sikeresen frissítve!');
      this.router.navigate(['/admin_edit']);
    } catch (error) {
      console.error('Hiba a mentéskor:', error);
      alert('Hiba történt a mentés során!');
    }
  }

  cancel() {
    this.router.navigate(['/admin_edit']);
  }
}
