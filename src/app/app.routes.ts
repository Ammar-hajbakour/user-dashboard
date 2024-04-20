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
        data: { searchByIdInput: true },
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
    ]
  },
  {
    path: '**', redirectTo: 'dashboard'
  }
];
