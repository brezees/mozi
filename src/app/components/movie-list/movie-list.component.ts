import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GenrePipe } from '../../pipes/genre.pipe';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { collection, getDocs, orderBy, query, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, GenrePipe, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  private firestore = inject(Firestore);
  private storage = inject(Storage); 
  private router = inject(Router);

  ngOnInit(): void {
    const moviesRef = collection(this.firestore, 'movies');
    const moviesQuery = query(moviesRef, orderBy('releaseDate', 'desc'));

    this.movies$ = new Observable<Movie[]>(observer => {
      getDocs(moviesQuery)
        .then(snapshot => {
          const movies = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data['title'],
              description: data['description'],
              releaseDate: data['releaseDate'],
              genre: Array.isArray(data['genre']) ? data['genre'] : [],
              duration: data['duration'],
              posterUrl: data['posterUrl']
            } as Movie;
          });
          observer.next(movies);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  uploadMoviePoster(movieId: string, file: File): Observable<string> {
    const filePath = `movie-posters/${movieId}.jpg`;
    const fileRef = ref(this.storage, filePath);

    return new Observable(observer => {
      uploadBytes(fileRef, file)
        .then(() => getDownloadURL(fileRef))
        .then(url => {
          observer.next(url);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  addMovie(movie: Partial<Movie>, file: File) {
    const movieId = crypto.randomUUID();
    this.uploadMoviePoster(movieId, file).subscribe(url => {
      const movieDoc = doc(this.firestore, 'movies', movieId);
      setDoc(movieDoc, {
        ...movie,
        posterUrl: url,
        id: movieId
      });
    });
  }

  onSelect(movie: Movie) {
    if (movie.id) {
      this.router.navigate(['/ticket-form', movie.id]);
    }
  }
}
