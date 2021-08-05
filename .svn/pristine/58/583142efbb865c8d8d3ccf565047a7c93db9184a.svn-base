export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  disabled?:boolean;
  t?:boolean;
  showpopover?:boolean;
  column_show?:boolean;
  table?: table[];
  width?:string
}
export interface table {
  displayedColumns?: DisplayedColumns[];
  data?: any;
}

export interface DisplayedColumns {
  editing?: boolean;
  columns?: any;
  name?: any;
  show?: boolean
}