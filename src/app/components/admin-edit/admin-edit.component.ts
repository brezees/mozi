import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, collectionData, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, RouterModule],
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit() {
    const moviesCollection = collection(this.firestore, 'movies');
    this.movies$ = collectionData(moviesCollection, { idField: 'id' }) as Observable<Movie[]>;
  }

  async deleteMovie(id: string) {
    const confirmDelete = confirm('Biztosan törlöd a filmet?');
    if (!confirmDelete) {
      return;
    }
    const movieDoc = doc(this.firestore, `movies/${id}`);
    try {
      await deleteDoc(movieDoc);
      alert('Film sikeresen törölve!');
    } catch (error) {
      console.error('Hiba a film törlésekor:', error);
      alert('Hiba történt a törlés során.');
    }
  }

  editMovie(id: string) {
    this.router.navigate(['/admin_edit_movie', id]);
  }

  goBack() {
    this.router.navigate(['/admin_choose']);
  }
}
