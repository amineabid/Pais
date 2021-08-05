import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FieldConfig } from '../../componentForms/field.interface';
import { FieldInputConfig } from '../../input-dynamique/fieldInput.interface';

@Component({
  selector: 'app-tablewithforms',
  templateUrl: './tablewithforms.component.html',
  styleUrls: ['./tablewithforms.component.scss']
})
export class TablewithformsComponent implements OnInit {
  @Input()
  displayedColumns = [];
  columnsToDisplay: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  initialData: any[] = [];
  dataSourceMat: MatTableDataSource<any> = new MatTableDataSource(this.initialData);
  @Output() ifChangeElement = new EventEmitter();
  @Output() ifdeleteElement = new EventEmitter();
  @Output() ifCreateElement = new EventEmitter();

  @Input()
  regConfig: FieldConfig[] = [];
  @Input()
  btncreate: boolean = false;
  @Input()
  btndelete: boolean = true;

  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  fildesConfig:FieldInputConfig[]=[];

  selection = new SelectionModel<any>(true, []);
  OpenHelpOnClick(event) {
    console.log("this is click")
  }
  OpenHelp(event) {
    console.log("this is click")
  }
  OpenHelpOnCHange(event) {
    console.log("this is click")
  }
  //start user-table Methode
  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    // this.addRow();
    this.dataSourceMat.data = this.initialData;
    this.columnsToDisplay.push('select');
    this.regConfig.forEach(element => {
      if (element.name != undefined) {
        this.columnsToDisplay.push(element.name)
      }
    });
    this.regConfig.forEach(element => {
      if (element.column_show == false) {
        let index = this.columnsToDisplay.indexOf(element.name)
        this.columnsToDisplay.splice(index, 1);
      }
    });
    
      
    this.initialData.forEach((element,index) => {
      
        this.regConfig.forEach(cool => {
            this.fildesConfig.push(
              {
                type: "input",
                label: cool.label,
                inputType: cool.inputType,
                name: cool.name + index,
                value: element[cool.name],
                validations: cool.validations,
              }
            );
        });
      });
      
    
  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
    this.dataSourceMat.sort = this.sort;
    this.dataSourceMat.paginator = this.paginator;
    
    
    
  }
  getInputType(column,el,index){
    return this.fildesConfig.find(elem=>elem.name==column+index);
  }
  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      dob: ['', [Validators.required]],
      bloodGroup: [''],
      mobNumber: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true]
    });
  }

  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.removeAt(1);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }
//Fin user-table Methode
  gettype(column) {
    if (column == undefined) { return; }
    return this.regConfig.find(row => row.name == column);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.initialData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.initialData.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
