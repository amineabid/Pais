import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldInputConfig } from './fieldInput.interface'
@Component({
  selector: 'app-input-dynamique',
  // templateUrl: './input-dynamique.component.html',
  template: `
  <!-- <form class="dynamic-form" [formGroup]="group" (submit)="onSubmit($event)">
  </form> style="margin: 3px;" class="example-full-width"-->
  <div  >
    <mat-form-field   *ngFor="let field of fields;" appearance="outline" [formGroup]="group">
      <mat-label>{{field.label}}</mat-label>
      <input matInput 
      [formControlName]="field.name" 
      [name]="field.name" 
      [placeholder]="field.label" 
      [value]="field.value"
      (keyup)="OnKeyUp($event)"
      (click)="OnClick(field)"
      (change)="OnChange(field)"
      [type]="field.inputType"
      autocomplete="off"
          >
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
      <mat-icon matSuffix [ngStyle]="{'cursor': 'pointer'}" (click)="clciksearch($event)">search</mat-icon>
  </mat-form-field>
  </div>
  <!-- (opened)="showtable($event)" (closed)="update($event)" -->

  `,
  styleUrls: ['./input-dynamique.component.css']
})
export class InputDynamiqueComponent implements OnInit {
  @Input()
  fields: FieldInputConfig[];
  @Output() ifClickInput = new EventEmitter();
  @Output() ifKeyUpInput = new EventEmitter();
  @Output() ifChangeInput = new EventEmitter();
  @Output() ifSearchClick = new EventEmitter();
  group: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.group= this.createControl();
  }
  clciksearch(event){
    this.ifSearchClick.emit(event)
  }
  OnKeyUp(event){
    // console.log(event)
    this.ifKeyUpInput.emit(event)
  }
  OnClick(event){
    // console.log(event)
    this.ifClickInput.emit(event)
  }
  OnChange(event){
    // console.log(event)
    this.ifChangeInput.emit("show_table")
  }
  onSubmit(event){

  }
  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
