import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SatPopover } from '@ncstate/sat-popover';
import { BehaviorSubject, Observable } from 'rxjs';
import { FieldConfig } from '../../componentForms/field.interface';
import { SnackebarService } from '../../snackbar/snackebar.service';
@Component({
  selector: 'app-tablewithform-v1',
  templateUrl: './tablewithform-v1.component.html',
  styleUrls: ['./tablewithform-v1.component.scss']
})
export class TablewithformV1Component implements OnInit {
  @Input()
  displayedColumns = [];
  columnsToDisplay: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  get lienReport(): any { return this._lienReport }
  set lienReport(x: any) {
    this._lienReport = x;
  }
  _lienReport: any;
  
  _initialData: any[] = [];
  initialData: any[] = [];
  @Input()
  form: FormGroup;
  formout: FormGroup;
  //dataSource = new ExampleDataSource(this.initialData);
  @Input()
  get dataSourceMatt(): any { return this._dataSourceMat; }
  set dataSourceMatt(x: any) {
    this.dataSourceMat = this._dataSourceMat = x;
    //this.dataSourceMat.data = x.data;
    console.log(this.dataSourceMat.data);
    
  }
  _dataSourceMat: MatTableDataSource<any> ;
  dataSourceMat: MatTableDataSource<any> ;
  @Output() ifChangeElement = new EventEmitter();
  @Output() ifdeleteElement = new EventEmitter();
  @Output() ifCreateElement = new EventEmitter();
  @Output() ifRefrechData = new EventEmitter();
  @Output() btnValiderDisabled = new EventEmitter();

  @Input()
  regConfig: FieldConfig[] = [];
  @Input()
  btncreate: boolean = false;
  @Input()
  btndelete: boolean = true;

  @ViewChild('scrollframe', { static: false }) scrollFrame: any;
  @ViewChild('testtable', { static: false }) tabletest: any;
  @ViewChild('inputadd', { static: false }) inputadd: any;
  @ViewChild('paginationevent', { static: false }) paginationevent: any;

  selection = new SelectionModel<any>(true, []);

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public snackService: SnackebarService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
  }
  async RefreshData() {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(100);
    this.dataSourceMat.data = this.initialData;
    //console.log(this.inputadd)
    this.btnValiderDisabled.emit(this.btncreate)
  }
  ngAfterViewInit(): void {
    this.dataSourceMat.sort = this.sort;
    this.dataSourceMat.paginator = this.paginator;
    this.tabletest._elementRef.nativeElement.children[0].children[0].children[0].style.width = "10px";
    this.regConfig.forEach(element => {
      if (element.name != undefined) {
        let index = this.columnsToDisplay.indexOf(element.name)
        if (element.width != undefined) {
          this.tabletest._elementRef.nativeElement.children[0].children[0].children[index].style.width = element.width;
        }
      }
    });
    

  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event<600) {
      this.paginationevent._changeDetectorRef._lView[23].style.display = "block"
    }
  }
  
  async ngOnInit(): Promise<void> {
    this.formout = this._formBuilder.group({
      data:this.form
    });
    // this.formout.setControl('data', this.form);
    // console.log((this.formout.get('data') as FormArray).controls);
    console.log(this.formout);
    
    //this.dataSource = new ExampleDataSource((this.formout.get('data') as FormArray).controls);
    this.dataSourceMat = new MatTableDataSource((this.formout.get('data') as FormArray).controls);
    this.dataSourceMat.filterPredicate = (data: FormGroup, filter: string) => {
      return Object.values(data.controls).some(x => x.value == filter);
    };
    // this.dataSourceMat.data = this.initialData;
    // this.form = this._formBuilder.group(this._formBuilder.array([]));
    
    // console.log((this.form.get('') as FormArray).controls);
    
    // this.dataSource = new ExampleDataSource((this.form.get('') as FormArray).controls);
    // this.dataSourceMat = new MatTableDataSource((this.form.get('') as FormArray).controls);
    this.columnsToDisplay.push('select');
    this.getShowColumn()
    this.columns = [];
    this.columnsToDisplay.forEach((colunm, index) => {
      this.columns.push({ field: colunm });
    });
    this.columnsToDisplay = [];
    this.setDisplayedColumns();

  }
  columns: any[] = [];
  previousIndex: number;
  setDisplayedColumns() {
    this.columns.forEach((colunm, index) => {
      colunm.index = index;
      this.columnsToDisplay[index] = colunm.field;

    });

  }
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
  }
  onchangeCell(elem) {

  }
  pageEvent(event) {
    console.log(event)
  }
  elem: any;
  pageindex: any;
  async CreateNew() {
    this.ifCreateElement.emit(this.initialData);

    const aa = this.initialData;

    moveItemInArray(aa, aa.length - 1, 0);

    this.dataSourceMat.data = aa;

    this.scrollFrame.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.btncreate = true;
    this.btnValiderDisabled.emit(this.btncreate)
    if (this.isChecked == true) {
      this.indexsize = 10;
    } else {
      this.indexsize = this.initialData.length + 10;
    }

    this.elem = aa[0];
    this.pageindex = 0;
    console.log(this.paginationevent._pageIndex = 0)
    this.dataSourceMat.data = aa;

  }
  indexsize: number = 10;
  pagesize(event: boolean) {
    if (this.isChecked == true) {
      this.indexsize = 10;
    } else {
      this.indexsize = this.initialData.length + 10;
    }
  }
  isChecked = true;
  async CheckedPagination() {
    if (this.isChecked == true) {
      this.indexsize = 10;
    } else {
      this.indexsize = this.initialData.length + 1;
    }
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(100);
    this.dataSourceMat.data = this.initialData;
  }
  getValueRow(column, index) {
    if (this.initialData.length != 0) {
      let d = this.initialData[index];
      return d[column]
    } else {
      return null
    }
  }
  deleteSelect() {

  }
  //Methode Fin Output
  closeopenInlineEdit: boolean = false;
  disabledbtndelete() {
    this.btndelete = true;
    let listremove = [];
    this.selection.selected.forEach(item => {
      let index: number = this.initialData.findIndex(d => d === item);
      listremove.push(this.initialData[index])
      this.btndelete = false;
    });

    if (listremove.length == 0) {
      this.btndelete = true;
    }
  }
  preelemnt: any = true;
  verifPermeierLigne() {

  }
  async update(column: string, el: Element, comment: any) {
    console.log(comment);
    

  }
  chainedeValidation = "";
  @ViewChild(SatPopover) popover: SatPopover;
  showpopover: boolean = false;
  OpenPopOver() {
    this.closeopenInlineEdit = true;
  }
  Openinline_edit(val) {
    this.closeopenInlineEdit = true;
  }

  GetAllData() {
  }

  ngOnDestroy(): void {
  }
  gettype(column) {
    if (column == undefined) { return; }
    return this.regConfig.find(row => row.name == column);
  }
  getLableColumn(column_name) {
    let labelget;
    this.regConfig.forEach(element => {
      if (element.name.trim() == column_name.trim()) {
        labelget = element.label;
      }
    });
    return labelget;
  }

  getShowColumn() {
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
  }
  getEditColumn(column) {
    return this.regConfig.find(row => row.name == column).showpopover;
  }
  submit(event) {
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
  openDialog() {
    let listremove = [];
    this.selection.selected.forEach(item => {
      let index: number = this.initialData.findIndex(d => d === item);
      listremove.push(this.initialData[index])
    });
    const dialogRef = this.dialog.open(DeleteAnyDataDialog, {
      width: '400px',
      data: listremove
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined) {
        this.deleteSelect();
      }
    });
  }
}
export class ExampleDataSource extends DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);

  data() {

    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.dataSubject;
  }

  disconnect() { }
}


@Component({
  selector: 'app-delete-any-data',
  template: `        
        <h1 mat-dialog-title></h1>
        <div mat-dialog-content>
                <!-- <p>{{data |json}}</p>  -->
        </div>
        <div mat-dialog-actions align="end">
              <button mat-button (click)="onNoClick()">Non</button>
              <button mat-raised-button (click)="onOuiClick()" color="primary" cdkFocusInitial>Oui</button>
        </div>`,
  styles: ['']
})
export class DeleteAnyDataDialog {
  constructor(public dialogRef: MatDialogRef<DeleteAnyDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOuiClick(): void {
    this.dialogRef.close(this.data);
  }


}
