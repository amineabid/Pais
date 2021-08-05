import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeCalculeRoutingModule } from './mode-calcule-routing.module';
import { ModeCalculeComponent } from './mode-calcule.component';
import { ShareModule } from 'src/app/share/share.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ModeCalculeComponent],
  imports: [
    CommonModule,
    ModeCalculeRoutingModule,
    ShareModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class ModeCalculeModule { }
