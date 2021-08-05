import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListConventionRoutingModule } from './list-convention-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListConventionComponent } from './list-convention.component';
import { MatTableModule } from '@angular/material/table';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [ListConventionComponent],
  imports: [
    CommonModule,
    ListConventionRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatSidenavModule,
    HttpClientModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ShareModule
  ],
  providers: [
    HttpClient
  ],
  exports:[
    ListConventionComponent
  ]
})
export class ListConventionModule { }
