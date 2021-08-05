import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndemniteRoutingModule } from './indemnite-routing.module';
import { IndemniteComponent} from './indemnite.component'
import { IndemniteService } from 'src/controller/indemnite.service';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [IndemniteComponent],
  imports: [
    CommonModule,
    IndemniteRoutingModule,
    ShareModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [IndemniteService],
})
export class IndemniteModule { }
