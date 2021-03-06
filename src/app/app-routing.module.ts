import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LayoutFullComponent } from './layout/layout-full/layout-full.component';
// import { LayoutSidebarComponent } from './layout/layout-sidebar/layout-sidebar.component';
// import { ConventionComponent } from './page/convention/convention.component';
// import { HomeComponent } from './page/home/home.component';
// import { ListConventionComponent } from './page/convention/list-convention/list-convention.component';
// import { AddUpdateConventionComponent } from './page/convention/add-update-convention/add-update-convention.component';
// import { DeleteConventionComponent } from './page/convention/delete-convention/delete-convention.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout-full/layout-full.module').then(module => module.LayoutFullModule)

 
  },
  {
    path: 'admin',
    loadChildren: () => import('./layout/layout-sidebar/layout-sidebar.module').then(module => module.LayoutSidebarModule)

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
