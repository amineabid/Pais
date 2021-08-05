import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUpdateConventionRoutingModule } from './add-update-convention-routing.module';
import { AddUpdateConventionComponent } from './add-update-convention.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ShareModule } from 'src/app/share/share.module';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';


@NgModule({
  declarations: [AddUpdateConventionComponent],
  imports: [
    CommonModule,
    AddUpdateConventionRoutingModule,
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

    MatDatepickerModule,
    MatNativeDateModule,
    ShareModule
    // NgxMatTimepickerModule,
    // NgxMatDatetimePickerModule,
    // NgxMatNativeDateAdapter,
    // NgxMatDatetimePickerModule,
    // NgxMatTimepickerModule,
  ]
})
export class AddUpdateConventionModule { }
