import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/share/share.module';
import { LayoutSidebarComponent } from './layout-sidebar.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ConventionModule } from 'src/app/page/convention/convention.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutSideBarRoutingModule } from './layout-sidebar.routing';
import { HeaderComponent } from 'src/app/share/component/header/header.component';
import { SidebarComponent } from 'src/app/share/component/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/share/component/footer/footer.component';
@NgModule({
  declarations: [LayoutSidebarComponent],//HeaderComponent,SidebarComponent,FooterComponent
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    // BrowserModule,
    ShareModule, 
    RouterModule,
    FormsModule,
    MatSidenavModule,

    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    // ConventionModule,

    MatListModule,
    LayoutSideBarRoutingModule
  ],exports:[
    LayoutSidebarComponent,
    ShareModule
  ]
})
export class LayoutSidebarModule { }
