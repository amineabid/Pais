import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutFullModule } from 'src/app/layout/layout-full/layout-full.module';
import { LayoutSidebarModule } from 'src/app/layout/layout-sidebar/layout-sidebar.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './page/auth/auth.component';
import { LayoutFullComponent } from './layout/layout-full/layout-full.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { NgbPaginationModule, NgbAlertModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppLoaderService } from './share/component/app-loader/app-loader.service';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    // LayoutFullComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbCollapseModule,
    // FlexLayoutModule,
    // LayoutFullModule,
    // LayoutSidebarModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    SatPopoverModule,
    NgbModule,
    MatDialogModule
    
  ],
  providers: [
    AppLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
