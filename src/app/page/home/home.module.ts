import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent} from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home.routing';
import { ShareModule } from 'src/app/share/share.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HomeRoutingModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule
  ]
})
export class HomeModule { }
