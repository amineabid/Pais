import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModCnssComponent } from './mod-cnss.component';

const routes: Routes = [
  {
    path: '',
    component: ModCnssComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModCnssRoutingModule { }
