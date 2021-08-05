export interface PageEnTeteLigneConfig {
  titrePage?:string;
  tableEntete?: TableEnTet;
  tableLigne?: TableLigne;
  fieldEntete?: FieldInputConfig[];
}
export interface TableLigne {
  data: any[];
  ColumnToDisiplay?: string[];
  regConfig?: FieldConfig[];
}
export interface TableEnTet {
  data: any[];
  ColumnToDisiplay?: string[];
}
export interface ValidatorInput {
  name: string;
  validator: any;
  message: string;
}
export interface FieldInputConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: ValidatorInput[];
  disabled?: boolean;
  showpopover?: boolean;
  column_show?: boolean;
}

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
  disabled?: boolean;
  t?: boolean;
  showpopover?: boolean;
  column_show?: boolean;
  table?: table[];
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