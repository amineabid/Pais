import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteComptableRoutingModule } from './compte-comptable-routing.module';
import { CompteComptableComponent } from './compte-comptable.component';
import { ShareModule } from 'src/app/share/share.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

    


@NgModule({
  declarations: [CompteComptableComponent],
  imports: [
    CommonModule,
    CompteComptableRoutingModule,
    ShareModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class CompteComptableModule { }
