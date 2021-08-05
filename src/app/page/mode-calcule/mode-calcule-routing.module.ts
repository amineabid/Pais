import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModeCalculeComponent } from './mode-calcule.component';

const routes: Routes = [
  {
    path: '',
    component: ModeCalculeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeCalculeRoutingModule { }
