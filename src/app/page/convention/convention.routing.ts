import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateConventionComponent } from './add-update-convention/add-update-convention.component';
// import { LayoutFullComponent } from './layout-full.component';
import { ConventionComponent } from './convention.component';
import { DeleteConventionComponent } from './delete-convention/delete-convention.component';
import { DetailConventionComponent } from './detail-convention/detail-convention.component';
const routes: Routes = [
    {
        path: '',
        component: ConventionComponent,
        children: [
            {
                path: 'add_update/:id',
                loadChildren: () => import(`./add-update-convention/add-update-convention.module`)
                    .then(m => m.AddUpdateConventionModule)
            },
            {
                path: 'add_update',
                loadChildren: () => import(`./add-update-convention/add-update-convention.module`)
                    .then(m => m.AddUpdateConventionModule)
            },
            // {
            //     path: '',
            //     loadChildren: () => import(`./list-convention/list-convention.module`)
            //         .then(m => m.ListConventionModule)
            //     // component: AddUpdateConventionComponent,
            // },
            {
                path: 'delete/:id',
                loadChildren: () => import(`./delete-convention/delete-convention.module`)
                    .then(m => m.DeleteConventionModule)
                // component: DeleteConventionComponent,
            },
            {
                path: 'detail/:id',
                loadChildren: () => import(`./detail-convention/detail-convention.module`)
                    .then(m => m.DetailConventionModule)
                // component: DetailConventionComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConventionRoutingModule { }
