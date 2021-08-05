import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimConventionComponent } from './prim-convention.component';

const routes: Routes = [
  {
    path: '',
    component: PrimConventionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimConventionRoutingModule { }
