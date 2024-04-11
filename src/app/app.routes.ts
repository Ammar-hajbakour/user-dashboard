import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full',
  },
  { 
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
  },
 
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./details-page/details-page.component').then(
        (c) => c.DetailsPageComponent
      ),
  },
];
