import { Pipe, PipeTransform } from '@angular/core';

export interface GenreOption {
  key: string;
  name: string;
}

export const GENRE_OPTIONS: GenreOption[] = [
  { key: 'action', name: 'Akció' },
  { key: 'drama', name: 'Dráma' },
  { key: 'comedy', name: 'Vígjáték' },
  { key: 'horror', name: 'Horror' },
  { key: 'sci-fi', name: 'Sci-Fi' },
  { key: 'fantasy', name: 'Fantasy' },
  { key: 'romance', name: 'Romantikus' },
  { key: 'thriller', name: 'Thriller' },
  { key: 'animation', name: 'Animáció' },
  { key: 'documentary', name: 'Dokumentumfilm' },
  { key: 'adventure', name: 'Kaland' },
  { key: 'mystery', name: 'Rejtély' },
  { key: 'biography', name: 'Életrajzi' },
  { key: 'musical', name: 'Zenei' },
  { key: 'western', name: 'Western' },
  { key: 'crime', name: 'Bűnügyi' },
  { key: 'sport', name: 'Sport' },
  { key: 'war', name: 'Háborús' },
  { key: 'family', name: 'Családi' },
  { key: 'history', name: 'Történelmi' },
  { key: 'short', name: 'Rövidfilm' },
  { key: 'noir', name: 'Film Noir' },
  { key: 'superhero', name: 'Szuperhős' },
  { key: 'cult', name: 'Kultikus' }
];

@Pipe({ name: 'genreName', standalone: true })
export class GenrePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const match = GENRE_OPTIONS.find(option => option.key === value);
    return match ? match.name : value;
  }
}
