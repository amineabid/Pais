import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutSidebarComponent } from './layout-sidebar.component';
// import { LayoutFullComponent } from './layout-full.component';
// import { HomeComponent } from 'src/app/page/home/home.component';
// 
const routes: Routes = [
    {
        path: '',
        component:LayoutSidebarComponent,
        children: [
            {
                path: 'convention',
                loadChildren: () => import('./../../page/convention/convention.module').then(module => module.ConventionModule)
            },
            {
                path: 'dashbord',
                loadChildren: () => import('./../../page/home/home.module').then(module => module.HomeModule)
            },
            {
                path: 'prim-convention',
                loadChildren: () => import('./../../page/prim-convention/prim-convention.module').then(module => module.PrimConventionModule)
            },
            {
                path: 'cnss-convention',
                loadChildren: () => import('./../../page/cnss-convention/cnss-convention.module').then(module => module.CnssConventionModule)
            },
            {
                path: 'indemnite',
                loadChildren: () => import('./../../page/indemnite/indemnite.module').then(module => module.IndemniteModule)
            },
            {
                path: 'mode-calcule',
                loadChildren: () => import('./../../page/mode-calcule/mode-calcule.module').then(module => module.ModeCalculeModule)
            },
            {
                path: 'compte-comptable',
                loadChildren: () => import('./../../page/compte-comptable/compte-comptable.module').then(module => module.CompteComptableModule)
            },
            {
                path: 'mod-cnss',
                loadChildren: () => import('./../../page/mod-cnss/mod-cnss.module').then(module => module.ModCnssModule)
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutSideBarRoutingModule { }