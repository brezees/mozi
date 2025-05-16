export interface Movie {
  id?: string;
  title: string;
  description: string;
  releaseDate: string;
  genre: string[]; 
  duration: number;
  posterUrl: string;
}