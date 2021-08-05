import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CnssConventionRoutingModule } from './cnss-convention-routing.module';
import { CnssConventionComponent} from './cnss-convention.component';
import { ShareModule } from 'src/app/share/share.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [CnssConventionComponent],
  imports: [
    CommonModule,
    CnssConventionRoutingModule,
    ShareModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    SatPopoverModule,
    MatTooltipModule,
    MatRadioModule,
    MatDividerModule,
    MatDatepickerModule
  ]
})
export class CnssConventionModule { }
