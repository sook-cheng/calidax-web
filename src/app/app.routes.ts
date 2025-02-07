import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./routes/protected-routes.module').then((m) => m.ProtectedRoutesModule),
  },

  // Router always returns the first matching route
  // The wildcard route (**) matches every URL and should be placed last
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
