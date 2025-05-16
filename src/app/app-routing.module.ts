import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminChooseComponent } from './components/admin-choose/admin-choose.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AdminMovieEditComponent } from './components/admin-movie-edit/admin-movie-edit.component';
import { AuthGuard } from '../app/auth.guard'; 

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },

  { path: 'admin_choose', component: AdminChooseComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin_edit', component: AdminEditComponent, canActivate: [AuthGuard] },

  { path: 'admin_edit_movie/:id', component: AdminMovieEditComponent, canActivate: [AuthGuard] },

  {
    path: 'ticket-form/:movieId',
    loadComponent: () =>
      import('./components/ticket-form/ticket-form.component').then(m => m.TicketFormComponent),
  },
  {
    path: 'jegy/:movieId',
    loadComponent: () =>
      import('./components/ticket-form/ticket-form.component').then(m => m.TicketFormComponent),
  },

  { path: '**', redirectTo: '' },
];
