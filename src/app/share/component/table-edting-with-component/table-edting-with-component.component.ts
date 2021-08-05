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
import { FieldConfig } from '../componentForms/field.interface';
import { SnackebarService } from '../snackbar/snackebar.service';

@Component({
  selector: 'app-table-edting-with-component',
  templateUrl: './table-edting-with-component.component.html',
  styleUrls: ['./table-edting-with-component.component.scss']
})
export class TableEdtingWithComponentComponent implements OnInit {
  @Input()
  displayedColumns = [];
  columnsToDisplay: any[] =[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  get lienReport(): any { return this._lienReport}
  set lienReport(x: any) {
    this._lienReport = x;
  }
  _lienReport:any;
  @Input()
  get initialDataa(): any { return this._initialData; }
  set initialDataa(x: any) {
    
    this.initialData = this._initialData =x;
    if(x.length==0){
      this.btncreate=true;
      
    }else{
      this.btncreate = false;
    }
    
    this.RefreshData();
  }
  _initialData: any[] = [];
  initialData: any[] = [];
  dataSource = new ExampleDataSource(this.initialData);
  dataSourceMat: MatTableDataSource<any> = new MatTableDataSource(this.initialData);
  @Output() ifChangeElement = new EventEmitter();
  @Output() ifdeleteElement = new EventEmitter();
  @Output() ifCreateElement = new EventEmitter();
  @Output() ifRefrechData = new EventEmitter();
  @Output() btnValiderDisabled = new EventEmitter();

  @Input()
  regConfig: FieldConfig[] = [];
  @Input()
  btncreate:boolean=false;
  @Input()
  btndelete:boolean=true;

  @ViewChild('scrollframe', { static: false }) scrollFrame: any;
  @ViewChild('testtable', { static: false }) tabletest: any;
  @ViewChild('inputadd', { static: false }) inputadd: any;
  @ViewChild('paginationevent', { static: false }) paginationevent: any;
  form: FormGroup;
  group: FormGroup;
selection = new SelectionModel<any>(true, []);

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public snackService: SnackebarService, 
    public dialog: MatDialog,
     changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
    private _formBuilder: FormBuilder
    ) {

    
    this.mobileQuery = media.matchMedia('(max-width: 400px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  async RefreshData(){
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(100);
    this.dataSourceMat.data = this.initialData;
    console.log(this.inputadd)
    this.btnValiderDisabled.emit(this.btncreate)
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSourceMat.sort = this.sort;
    this.dataSourceMat.paginator = this.paginator;
    // this.tble.nativeElement.querySelector('tbody').setAttribute('data-title', 'Sivakumar Tadisetti');
    // this.tble.nativeElement.querySelector('tbody').setAttribute('id', 'tbodytest');
    // this.tble.nativeElement.querySelector('tbody').setAttribute('style', 'height:300px;overflow:scroll;');
    // console.log(this.tble.nativeElement.querySelector('tbody'));offsetWidth
    // moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
    this.tabletest._elementRef.nativeElement.children[0].children[0].children[0].style.width ="10px";
    //this.tabletest._elementRef.nativeElement.children[0].children[0].children[4].style.width ="100px";
    //console.log(this.tabletest._elementRef.nativeElement.children[0].children[0].children[0].style.width)
    this.regConfig.forEach(element => {
      if (element.name != undefined) {
        let index = this.columnsToDisplay.indexOf(element.name)
        if (element.width!=undefined){
          this.tabletest._elementRef.nativeElement.children[0].children[0].children[index].style.width = element.width;
        }
      }
    });
     
    if (this.mobileQuery.matches){
      console.log(this.paginationevent._changeDetectorRef._lView[23].style.display = "block")
    }
    
    // console.log(this.tabletest._elementRef.nativeElement.children[1].style)
    // console.log(this.scrollFrame.nativeElement.style.overflow = "scroll")
    /*console.log(this.scrollFrame.nativeElement.scroll(
      {
        height:"100px",
        // top: this.scrollFrame.nativeElement.scrollHeight,
        // left: 0,
        // behavior: 'smooth'
      }
      ))*/
    // console.log(this.tabletest._elementRef.nativeElement.children[1].style.overflow = "scroll")
    // console.log(this.tabletest._elementRef.nativeElement.children[1].style.height = "100px")
    // console.log(this.tabletest._elementRef.nativeElement.children[1].style.display = "flex")
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.mobileQuery.matches) {
      this.paginationevent._changeDetectorRef._lView[23].style.display = "block"
    }
  }
  async ngOnInit(): Promise<void> {
    this.dataSource = new ExampleDataSource(this.initialData);
    // this.dataSourceMat= new MatTableDataSource(this.initialData);
    this.dataSourceMat.data = this.initialData;
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // await sleep(300);
    this.columnsToDisplay.push('select');

    this.getShowColumn()
    this.columns = [];
    this.columnsToDisplay.forEach((colunm, index) => {
      this.columns.push({ field: colunm });
    });
    this.columnsToDisplay = [];
    this.setDisplayedColumns();
    this.form = this._formBuilder.group({
      data: this._formBuilder.array([])
    });
    this.form.setControl('data', new FormArray(this.initialData));

    // function sayHi() {
    //   this.ifRefrechData.emit(this.initialData)
    // }
    // setTimeout(sayHi, 1000);
  }
  filterColumn(filterValue: string, col: string): void {
    // let filtrage = this.dataSourceMat.data;
    // filtrage[col] = filterValue.trim().toLocaleLowerCase();
    // this.dataSourceMat.data = filtrage;
  }
  columns: any[] = [
    { field: 'position' },
    { field: 'name' },
    { field: 'weight' },
    { field: 'symbol' }
  ];
  previousIndex: number;
  setDisplayedColumns() {
    // this.columnsToDisplay.find()
    
    this.columns.forEach((colunm, index) => {
      // console.log(colunm.field + " " + index)
      colunm.index = index;
      this.columnsToDisplay[index] = colunm.field;

    });
    
  }
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
  }
  /*dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
    }
  }
  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }*/
//Methode OutPut
  onchangeCell(elem){
    // console.log(elem)
    
  }
  pageEvent(event){
    console.log(event)
  }
  elem:any;
  pageindex: any;
  async CreateNew() {
    this.ifCreateElement.emit(this.initialData);
    
    const  aa = this.initialData;

    moveItemInArray(aa, aa.length - 1, 0);

    this.dataSourceMat.data = aa;
    
    
//this.scrollFrame.nativeElement.scrollHeight
    this.scrollFrame.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.btncreate =true;
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
    // console.log(this.paginationevent)
    // console.log(bb)
    // console.log(this.initialData)
    // let last = this.initialData;
    // last.push(last[last.length - 1]);
    // console.log(Object.values(last[last.length-1])[1]);

    // console.log(last);
    // this.dataSourceMat.data = last;
    
  }
  indexsize:number=10;
  pagesize(event:boolean){
    // if (event == true){
    //   this.indexsize=10;
    // }else{
    //   this.indexsize= this.initialData.length + 10;
    // }
    // return this.indexsize;
    if (this.isChecked == true) {
      this.indexsize = 10;
    } else {
      this.indexsize = this.initialData.length + 10;
    }
  }
  isChecked=true;
  async CheckedPagination(){
    // this.isChecked = !this.isChecked;
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

    // return this.isChecked;
  }
  getderbierRow(column){
    // this.dataSourceMat.data = this.initialData;
    if (this.initialData.length!=0){
      let d = this.initialData[this.initialData.length - 1];
      return d[column]
    }else{
      return null
    }
  }
  getValueRow(column,index){
    // this.dataSourceMat.data = this.initialData;
    if (this.initialData.length!=0){
      let d = this.initialData[index];
      return d[column]
    }else{
      return null
    }
  }
  deleteSelect() {
    let listremove=[];
    this.selection.selected.forEach(item => {
      let index: number = this.initialData.findIndex(d => d === item);
      // console.log(this.initialData.findIndex(d => d === item));
      listremove.push(this.initialData[index])
      // this.initialData.splice(index, 1);
    });
    // this.dataSourceMat.data = this.initialData;
    this.ifdeleteElement.emit(listremove)
    this.dataSourceMat.data = this.initialData;

    this.selection = new SelectionModel<any>(true, []);
    this.refrech();
    this.btndelete = true;
    
    this.snackService.openSnackBar("✅ Supprimée dans list", "OK");
    // this.ifdeleteElement.emit(true);
  }
//Methode Fin Output
  closeopenInlineEdit:boolean=false;
  disabledbtndelete(){
    this.btndelete = true;
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    let listremove = [];
    this.selection.selected.forEach(item => {
      let index: number = this.initialData.findIndex(d => d === item);
      // console.log(this.initialData.findIndex(d => d === item));
      // console.log(item)
      listremove.push(this.initialData[index])
      // this.initialData.splice(index, 1);
      this.btndelete =false;
    });
    
    if (listremove.length==0){
      this.btndelete = true;
    }
  }
  preelemnt:any=true;
  verifPermeierLigne(){

  }
  async update(column:string,el: Element, comment: any) {
    
    if (comment.target != undefined) {
      comment = comment.target.value;
    }
    if (this.initialData.findIndex(e => e == el)===0 && el[column]===null){
      this.preelemnt = false;
    } else if (this.initialData.findIndex(e => e == el) != 0 && el[column] != null){
      this.preelemnt = true;
    }
    if (comment == null) { 
      this.closeopenInlineEdit = false;
      this.refrech();
      return; 
    }
    
    // copy and mutate
    const copy = this.dataSource.data().slice()
    let col = Object.keys(el);
    if (col.indexOf(column) == -1) {
      col.push(column);
    }
    col.forEach(l => {
      
      if (column == l) {
        el[column] = comment;
      }

    });
    this.dataSource.update(copy);
    this.ifChangeElement.emit({ column: column,elemnt:el});
    this.refrech();
 
  }
  chainedeValidation ="";
  async refrech(){
    let aa = this.dataSource.data();
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(300);
    this.btncreate = false;
    this.columnsToDisplay.forEach((l,i) => {
      if(i!=0){
        this.initialData.forEach(element => {
          if (element[l] == null || element[l] == 0 || element[l] == "") {
            this.btncreate = true;
            // console.log("this data not valid")
            return;
          }
        });
      }
      
    });
    if(this.btncreate){
      
      this.chainedeValidation = "il faut saisir tout les champs";
    } else if (this.btncreate==false){
      this.snackService.openSnackBar("✅ Ajoutée dans list", "OK");
      this.chainedeValidation = "";
      if (this.preelemnt === false && this.elem == this.initialData[0]){
        moveItemInArray(this.initialData, 0, this.initialData.length - 1);
        this.dataSourceMat.data = this.initialData
      }
    }
    
    this.btnValiderDisabled.emit(this.btncreate)

  }
  @ViewChild(SatPopover) popover: SatPopover;
  showpopover:boolean= false;
  OpenPopOver(){
    this.closeopenInlineEdit = true;
    // this.popover.open();
  }
  Openinline_edit(val) {
    this.closeopenInlineEdit = true;
    
    // this.popover.open(val);
  }

  GetAllData(){
    // console.log(this.dataSource.data())
  }
  
  ngOnDestroy(): void {
    // console.log("this component is close")
  }
  gettype(column){
    if(column==undefined){return;}
    return this.regConfig.find(row=>row.name==column);
  }
  getLableColumn(column_name){
    let labelget;
    this.regConfig.forEach(element => {
      if (element.name.trim() == column_name.trim()) {
        labelget= element.label;
      }
    });
    return labelget;
  }
  
  getShowColumn(){
    this.regConfig.forEach(element => {
      if(element.name!=undefined){
        this.columnsToDisplay.push(element.name)
      }
    });
    this.regConfig.forEach(element => {
      if(element.column_show==false){
        let index = this.columnsToDisplay.indexOf(element.name)
        this.columnsToDisplay.splice(index, 1);
      }
    });
  }
  getEditColumn(column){
    return this.regConfig.find(row => row.name == column).showpopover;
  }
  getDisplayedColumns(): any[] {
    return this.displayedColumns;
  }
  submit(event){
    // console.log(event.value);
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
      // console.log(this.initialData.findIndex(d => d === item));
      // console.log(item)
      listremove.push(this.initialData[index])
      // this.initialData.splice(index, 1);
    });
    const dialogRef = this.dialog.open(DeleteAnyDataDialog, {
      width: '400px',
      data: listremove
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result!=undefined){
        this.deleteSelect();
      }
      // console.log(result)
      // this.ngOnInit();deleteSelect();
      //this.ngOnInit();
      // this.parent.openSnackBar("Convention Supprimée");
    });
  }
}



/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
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
    // private parent: ConventionComponent,
    // @Inject(ConventionComponent) private parent: ConventionComponent
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOuiClick(): void {
    this.dialogRef.close(this.data);
  }


}
