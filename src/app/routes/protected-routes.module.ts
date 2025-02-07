import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PROTECTED_ROUTES } from './protected.routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(PROTECTED_ROUTES),
  ],
})

export class ProtectedRoutesModule { }
