import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListConventionComponent } from './list-convention.component';

const routes: Routes = [
  {
    path: '',
    component: ListConventionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListConventionRoutingModule { }
