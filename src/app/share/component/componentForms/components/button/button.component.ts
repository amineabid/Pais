import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-button",
  template: `
<div fxLayout="row" fxLayoutAlign="end none" class="mat-form-field example-full-width" [formGroup]="group">
  <button type="submit" mat-raised-button disabled="{{group.invalid}}" color="primary">{{field.label}}</button>
</div>
`,
  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
