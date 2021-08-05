import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModCnssRoutingModule } from './mod-cnss-routing.module';
import { ModCnssComponent } from './mod-cnss.component';
import { ShareModule } from 'src/app/share/share.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
    


@NgModule({
  declarations: [
    ModCnssComponent
  ],
  imports: [
    CommonModule,
    ModCnssRoutingModule,
    ShareModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class ModCnssModule { }
