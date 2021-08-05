import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompteComptableComponent } from './compte-comptable.component';

const routes: Routes = [
  {
    path: '',
    component: CompteComptableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteComptableRoutingModule { }
