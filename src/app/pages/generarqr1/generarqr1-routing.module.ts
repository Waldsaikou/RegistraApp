import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarqrPage } from './generarqr1.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Generarqr1PageRoutingModule {}
