import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-date",
  template: `
  <!-- style="margin-left: 15px;" -->
<mat-form-field class="example-full-width" appearance="outline" [formGroup]="group">
<input matInput [matDatepicker]="picker" (click)="picker.open()" [formControlName]="field.name" [placeholder]="field.label">
<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
<mat-datepicker touchUi  #picker></mat-datepicker>
<mat-hint></mat-hint>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>
`,
  styles: []
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
