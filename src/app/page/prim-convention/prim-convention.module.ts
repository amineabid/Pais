import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimConventionRoutingModule } from './prim-convention-routing.module';
import { PrimConventionComponent } from './prim-convention.component';
import { ShareModule } from 'src/app/share/share.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PrimeConventionService } from 'src/controller/InterfaceService/prime-convention.service';

@NgModule({
  declarations: [PrimConventionComponent],
  imports: [
    CommonModule,
    PrimConventionRoutingModule,
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
    MatProgressSpinnerModule,
    MatButtonToggleModule
  ],
  providers: [PrimeConventionService],
})
export class PrimConventionModule { }
