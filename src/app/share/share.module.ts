import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Component
import { FooterComponent } from './component/footer/footer.component';
import { SnackebarService } from './component/snackbar/snackebar.service';
import { HeaderModule} from './component/header/header.module';
import { SidebarModule } from './component/sidebar/sidebar.module';
import { SidebarrightModule } from './component/sidenavright/sidebarright.module';
import { DataTableModule } from './component/data-table/data-table.module';
import { InputComponent } from "./component/componentForms/components/input/input.component";
import { ButtonComponent } from "./component/componentForms/components/button/button.component";
import { SelectComponent } from "./component/componentForms/components/select/select.component";
import { DateComponent } from "./component/componentForms/components/date/date.component";
import { RadiobuttonComponent } from "./component/componentForms/components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./component/componentForms/components/checkbox/checkbox.component";
import { DynamicFieldDirective } from "./component/componentForms/components/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./component/componentForms/components/dynamic-form/dynamic-form.component";
 import {  TableEdtingWithComponentComponent } from './component/table-edting-with-component/table-edting-with-component.component';
import { InlineEditComponent } from './component/table-edting-with-component/inline-edit/inline-edit.component';
import { LoadingComponent } from './component/loading/loading.component';
//Pop
import { SatPopoverModule } from '@ncstate/sat-popover';
//Material
import { MatNativeDateModule, MatOptionModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableComponent } from './component/componentForms/components/table/table.component';
import { TableClassiqueComponent, DeleteAnyDataDialog } from './component/table-classique/table-classique.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TablePopoverComponent } from './component/table-popover/table-popover.component';
import { InputDynamiqueComponent } from './component/input-dynamique/input-dynamique.component';
import { EnTeteLigneComponent } from './page/en-tete-ligne/en-tete-ligne.component';
import { UserTableComponent} from './component/tableEditing/user-table/user-table.component';
import { TablewithformsComponent } from './component/tableEditing/tablewithforms/tablewithforms.component'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { A11yModule } from '@angular/cdk/a11y';
import { TablewithformV1Component } from './component/tableEditing/tablewithform-v1/tablewithform-v1.component';
import { MatRowKeyboardSelectionDirective } from './directive/mat-row-keyboard-selection.directive';
import { DisableDirective } from 'src/app/share/directive/disable.directive';
import { TablePopoverSimpleComponent } from './component/table-popover-simple/table-popover-simple.component'
import { AppLoaderService } from './component/app-loader/app-loader.service';
import { AppLoaderComponent } from './component/app-loader/app-loader.component';
@NgModule({
  declarations: [ FooterComponent,
   InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    LoadingComponent,
    TableEdtingWithComponentComponent,
    InlineEditComponent,
    TableComponent,
    TableClassiqueComponent,
    TablePopoverComponent,
    InputDynamiqueComponent,
    EnTeteLigneComponent,
    UserTableComponent,
    TablewithformsComponent,
    DeleteAnyDataDialog,
    TablewithformV1Component,
    MatRowKeyboardSelectionDirective,
    DisableDirective,
    TablePopoverSimpleComponent,
    AppLoaderComponent
    ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    HeaderModule,
    SidebarModule,
    SidebarrightModule,
    DataTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,

    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatPseudoCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    SatPopoverModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    A11yModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule,
    MatProgressSpinnerModule

  ],
  exports: [
    FooterComponent,
     HeaderModule,
    SidebarModule,
    SidebarrightModule,
    DataTableModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    LoadingComponent,
    TableEdtingWithComponentComponent,
    InlineEditComponent,
    MatTableModule,
    TableClassiqueComponent,
    InputDynamiqueComponent,
    EnTeteLigneComponent,
    UserTableComponent,
     TablewithformsComponent,
    TablewithformV1Component,
    MatRowKeyboardSelectionDirective,
    DisableDirective,
    MatSlideToggleModule,
    TablePopoverComponent,
    TablePopoverSimpleComponent,
    MatProgressSpinnerModule,
    AppLoaderComponent
  ],
  providers:[
    SnackebarService,
    AppLoaderService
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    LoadingComponent,
    TableEdtingWithComponentComponent,
    InlineEditComponent,
    TableClassiqueComponent,
    InputDynamiqueComponent,
    EnTeteLigneComponent,
    DisableDirective,
    TablePopoverComponent,
    TablePopoverSimpleComponent,
    AppLoaderComponent
  ]
})
export class ShareModule { }
