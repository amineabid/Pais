import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CnssConventionComponent } from './cnss-convention.component';

const routes: Routes = [
  {
    path: '',
    component: CnssConventionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CnssConventionRoutingModule { }
