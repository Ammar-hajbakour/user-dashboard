import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full',
  },
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        data: { hasSearchInput: true },
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
      {
        path: '404', loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
      }
    ]
  },
  {
    path: '**', redirectTo: '404'
  }
];
