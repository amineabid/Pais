import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutFullComponent } from './layout-full.component';
// import { LayoutFullComponent } from './layout-full.component';
// import { HomeComponent } from 'src/app/page/home/home.component';
// 
const routes: Routes = [
    {
        path: '',
        component: LayoutFullComponent,
        data: { header: false },
        children:[
            {
                path: '',
                loadChildren: () => import('./../../page/auth/auth.module').then(module => module.AuthModule)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutFullRoutingModule { }
