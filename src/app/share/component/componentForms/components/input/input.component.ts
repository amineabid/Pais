import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-input",
  template: `
<mat-form-field class="example-full-width" 
          appearance="outline"  [formGroup]="group">
          <mat-label>{{field.label}}</mat-label>
<input matInput [formControlName]="field.name" [placeholder]="field.label" 
(keyup)="OnKeyUp($event)"  [type]="field.inputType">
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>

`,
  styles: []
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  @Input()
  displayedColumns = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  initialData: any[] = [];
  dataSourceMat: MatTableDataSource<any> = new MatTableDataSource([]);

  @Output() ifChangeElement = new EventEmitter();
  update(comment) {
    // this.convention.data = this.convention2;
    // let value = (document.getElementById("a") as HTMLInputElement).value;
    // console.log(value)
    // this.showdataligne_conv(value)
    // this.datasource.update(copy);
  }
  showtable(event) {
    // this.applyFilter(this.elm.cod_CONV)
  }
  showelement(element) {
    this.group.get(this.field.name).setValue = element[0];
  }
  OnKeyUp(event){
    // console.log(event.target.value)
    this.ifChangeElement.emit(event.target.value);
    
  }
  constructor() {}
  ngOnInit() {}
}
