import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidenavService } from './sidebar.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';


@NgModule({
  declarations: [SidebarComponent,
    MenuListItemComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatTreeModule,
    MatProgressBarModule
  ],exports:[
    SidebarComponent,
    MenuListItemComponent
  ],
  providers:[
    SidenavService
  ]
})
export class SidebarModule { }
