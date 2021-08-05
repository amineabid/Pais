import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SatPopover } from '@ncstate/sat-popover';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppLoaderService } from '../app-loader/app-loader.service';
@Component({
  selector: 'app-table-classique',
  templateUrl: './table-classique.component.html',
  styleUrls: ['./table-classique.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableClassiqueComponent implements OnInit {
  expandedElement: any | null;

  formout: FormGroup;
  @Input() Allform:FormGroup
  @Input()
  get forme(): FormGroup { return this._form; }
  set forme(x: FormGroup) {
     this._form = x;
    this.Allform = x;
    console.log("value change");
    
    // this.RefrechData()
  }
  public _form: FormGroup;
  RefrechData(){
    this.formout = (this.Allform.get('Enligne') as FormGroup);

    this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // await sleep(400);
    
    this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;
    
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  // get lienReport(): any { return this._lienReport }
  // set lienReport(x: any) {
  //   this._lienReport = x;
  // }
  // _lienReport: any;
 
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild(SatPopover) popover: SatPopover;
  displayedColumns = [] ;
  @Input()
  regConfig:any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('scrollframe', { static: false }) scrollFrame: any;
  @ViewChild('paginationevent', { static: false }) paginationevent: any;
  // dataSourceDynm = new ExampleDataSource(this.Allform);
  dataSourceAsync;
  constructor(private sophiaLoader: AppLoaderService,public dialog: MatDialog, private renderer: Renderer2, private cdr: ChangeDetectorRef)
  { }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdr.detectChanges();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.cdr.detectChanges();
  }
  sortColumn(event){
    console.log(event);
    
    this.dataSource.sortingDataAccessor = (item, property) => {
      
      return item.controls[property].value;
    };
  }
  formshow=false;
  async ngOnInit():Promise<void> {
    this.formshow = false;
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // await sleep(400);
    this.regConfig.forEach(element => {
      this.displayedColumns.push(element.name);    
    });
    await sleep(400);
    // this.formout = (this.Allform.get('Enligne') as FormGroup);
    // this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.formshow=true;
  }
  newElement:any=undefined;
  CreateNew(){
    if ((this.formout.get('lignes') as FormArray).controls.length>0){
      let drow = (this.formout.get('lignes') as FormArray).getRawValue();
      
      // console.log(Math.max(...drow.map(x => x['ligne_LCONV'])));
      
      // drow = drow[drow.length - 1];
      let fg = new FormGroup({});
      //if list found formgroup
      this.regConfig.forEach((element,i) => {

        const control = new FormControl();
        const validList = [];
        if (element.validations.length > 0) {
          element.validations.forEach(valid => {
            validList.push(valid.validator);
          });
        }
        control.setValue(element.initialvalue)
        if (element.thisPrimaryKey == true && element.thisForignKey == true) {
          control.setValue(this.Allform.get('Entete').get(element.thisChangeif[0]).value)
        }

        if (element.thisIncriment != undefined) {
          
          control.setValue(Math.max(...drow.map(x => x[element.name])) + 1)
        }

        if (element.column_edit == false) {
          control.disable();
        }
        control.setValidators(validList)

        fg.addControl(element.name, control);
      });
      (<FormArray>this.formout.get('lignes')).push(fg);
    } else if ((this.formout.get('lignes') as FormArray).controls.length == 0){
      let fg = new FormGroup({});
      this.regConfig.forEach(element => {
        const control = new FormControl();
        const validList = [];
        if (element.validations.length > 0) {
          element.validations.forEach(valid => {
            validList.push(valid.validator);
          });
        }
        control.setValue(element.initialvalue)
        if (element.thisPrimaryKey == true && element.thisForignKey == true) {
          control.setValue(this.Allform.get('Entete').get(element.thisChangeif[0]).value)
        }

        if (element.thisIncriment != undefined) {
          control.setValue(element.initialvalue)
        }

        if (element.column_edit == false) {
          control.disable();
        }
        control.setValidators(validList)

        fg.addControl(element.name, control);
      });
      (<FormArray>this.formout.get('lignes')).push(fg);
    }
    this.newElement = (this.formout.get('lignes') as FormArray).controls[(this.formout.get('lignes') as FormArray).controls.length-1];
    
    
    const aa = (this.formout.get('lignes') as FormArray).controls;

    moveItemInArray(aa, aa.length - 1, 0);

    this.dataSource.data = aa;
    this.scrollFrame.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (this.isChecked == true) {
      this.indexsize = 10;
    } else {
      this.indexsize = (this.formout.get('lignes') as FormArray).controls.length + 10;
    }
    this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;
    
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    //console.log(this.isOnline)
    if (event.key=="+"){
      if(this.Allform.valid){
        this.CreateNew();
        // this.renderer.selectRootElement(Document[0].querySelector('input.ng-invalid'))[0].focus();
        console.log(this.renderer);
        
        //angular.element(Document[0].querySelector('input.ng-invalid'))[0].focus();      
      }
      
    }
  }
  showTablePopover:boolean=false;
  dataPopover=[];
  fildesConfigPopover=[];
  elemOnClick=undefined;
  columnOnClick=undefined;
  onClickInput(element: FormGroup, column:string){
    // console.log(element);
    // console.log(this.regConfig);
    // console.log(column);
    this.sophiaLoader.open('', {width: '320px'});
    this.elemOnClick = element;
    this.columnOnClick = column;
    this.regConfig.forEach(colelement => {
      if(colelement.name==column){
        if (colelement.t==true){
          this.expandedElement = this.expandedElement === element ? null : element;
          // this.fildesConfigPopover = colelement.table.displayedColumns.columns;
          let foundfild=[];
          colelement.table[0].displayedColumns[0].columns.forEach(colshow => {
            foundfild.push(colelement.table[0].displayedColumns[0].name.find(x => x.name == colshow));
          });
          // colelement.table[0].displayedColumns[0].name.forEach(colfound => {
          //   this.fildesConfigPopover.push()
          // });
          this.fildesConfigPopover = foundfild;
          this.dataPopover = colelement.table[0].data;
           this.showTablePopover=true;
           this.sophiaLoader.close();
          this.popover.open();
        }
      }
    });
   
  }
  onChangeInput(element, column) {
    this.elemOnClick = element;
    this.columnOnClick = column;
    this.regConfig.forEach(colelement => {
      if (colelement.name == column) {
        if (colelement.t == true) {
          this.expandedElement = this.expandedElement === element ? null : element;
          let foundfild = [];
          colelement.table[0].displayedColumns[0].columns.forEach(colshow => {
            foundfild.push(colelement.table[0].displayedColumns[0].name.find(x => x.name == colshow));
          });

          let filtred = colelement.table[0].data;

          filtred = filtred.find(x => Number(x[colelement.thisChangeif[1]]) === Number(element.value[column]))
          if (filtred != undefined) {
            this.regConfig.forEach(colelementup => {
              if (colelementup.thisChangeif != undefined) {
                if (colelementup.thisChangeif[1] != undefined) {

                  if (colelementup.name != column) {
                    element.get(colelementup.name).setValue(filtred[colelementup.thisChangeif[1]]);
                  }
                }
              }
            });
          }
        }
      }
    });

    this.elemOnClick = undefined;
    this.columnOnClick = undefined;
    if (this.formout.valid) {
      this.refrechAndTreeDataIfValid();
    }
  }
  onKeyPress:boolean=true;
  onKeyupInput(element, column,event){
    this.onKeyPress = true;
    if (this.gettype(column).inputType=="number") {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode != 110  && (charCode < 96 || charCode > 105)) {
        // let vv:string = element.get(column).value;
        // vv = vv.slice(0, 1);
        // element.get(column).setValue(vv);
        this.onKeyPress= false;
      }else{
        this.elemOnClick = element;
        this.columnOnClick = column;
        this.regConfig.forEach(colelement => {
          if (colelement.name == column) {
            if (colelement.t == true) {
              this.expandedElement = this.expandedElement === element ? null : element;
              let foundfild = [];
              colelement.table[0].displayedColumns[0].columns.forEach(colshow => {
                foundfild.push(colelement.table[0].displayedColumns[0].name.find(x => x.name == colshow));
              });

              let filtred = colelement.table[0].data;

              filtred = filtred.find(x => Number(x[colelement.thisChangeif[1]]) === Number(element.value[column]))
              if (filtred != undefined) {
                this.regConfig.forEach(colelementup => {
                  if (colelementup.thisChangeif != undefined) {
                    if (colelementup.thisChangeif[1] != undefined) {

                      if (colelementup.name != column) {
                        element.get(colelementup.name).setValue(filtred[colelementup.thisChangeif[1]]);
                      }
                    }
                  }
                });
              }
            }
          }
        });

        this.elemOnClick = undefined;
        this.columnOnClick = undefined;

        this.onKeyPress= true;
      }

      
    }else{
      this.elemOnClick = element;
      this.columnOnClick = column;
      this.regConfig.forEach(colelement => {
        if (colelement.name == column) {
          if (colelement.t == true) {
            this.expandedElement = this.expandedElement === element ? null : element;
            let foundfild = [];
            colelement.table[0].displayedColumns[0].columns.forEach(colshow => {
              foundfild.push(colelement.table[0].displayedColumns[0].name.find(x => x.name == colshow));
            });

            let filtred = colelement.table[0].data;
            
            filtred = filtred.find(x => Number(x[colelement.thisChangeif[1]]) === Number(element.value[column]))
            if (filtred != undefined) {
              this.regConfig.forEach(colelementup => {
                if (colelementup.thisChangeif != undefined) {
                  if (colelementup.thisChangeif[1] != undefined) {

                    if (colelementup.name != column) {
                      element.get(colelementup.name).setValue(filtred[colelementup.thisChangeif[1]]);
                    }
                  }
                }
              });
            }

          }
        }
      });

      this.elemOnClick = undefined;
      this.columnOnClick = undefined;
    }
    
      

  }
  async ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.formshow = false;
    
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // await sleep(400);
    //  this.formshow = true;
    // console.log(((changes.Allform.currentValue.get('Enligne') as FormGroup).get('lignes') as FormArray).controls);
    
    //this.cdr.detectChanges();
    // this.regConfig.forEach(element => {
    //   this.displayedColumns.push(element.name);
    // });
    // this.forme = changes.Allform.currentValue
    // this.formout = (changes.Allform.currentValue.get('Enligne') as FormGroup)
    // const aa = (this.formout.get('lignes') as FormArray).controls;
    // this.dataSource.data = aa;
    // this.formshow = true;
    
    this.formshow = false;
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // await sleep(400);
    // this.regConfig.forEach(element => {
    //   this.displayedColumns.push(element.name);
    // });
    await sleep(400);

    this.formout = (this.Allform.get('Enligne') as FormGroup);
    this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.formshow = true;
    
    
    //this.formshow = true;
    
     //this.dataSource.data = ((changes.Allform.currentValue.get('Enligne') as FormGroup).get('lignes') as FormArray).controls
    //this.RefrechData()
    //this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
     
  }
  OnGetElementTablePopoOver(event){
    
    this.regConfig.forEach(element => {
      
     
      // console.log(element.thisChangeif);
      if (element.thisChangeif != undefined){
        if (element.thisChangeif[1]!=undefined){
          this.elemOnClick.get(element.name).setValue(event[element.thisChangeif[1]]);
        }
      }
    });
    if(this.formout.valid){
      this.refrechAndTreeDataIfValid();
    }
    this.popover.close();
    this.showTablePopover = false;

    this.elemOnClick = undefined;
    this.columnOnClick = undefined;
    // this.newElement = undefined;
  }
  
  refrechAndTreeDataIfValid()
  {
    
    this.regConfig.forEach(element => {

      if (element.thisIncriment != undefined) {
        let aa = (this.formout.get('lignes') as FormArray).controls;
        let drow = (this.formout.get('lignes') as FormArray).getRawValue();

        aa.forEach((fg,index) => {
          let max = Math.max(...drow.map(x => x[element.name]));
          if ((fg as FormGroup).controls[element.name].value == max){
            moveItemInArray(aa, index, aa.length);
            drow.splice(drow.length, 1);
          }
        });
        
        this.dataSource.data = aa;
        // this.newElement = undefined;
      
        
      }
    });
  }
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  get ligne(): FormArray {
    return this.formout.get('lignes') as FormArray;
  }

  // On user change I clear the title of that album 
  @Output() valueChange = new EventEmitter();
  OnClickCell(element){
    this.valueChange.emit(element.value);
  }
  onUserChange(event, album: FormGroup) {

    // title.setValue(title);
    this.valueChange.emit(album.value);
    // return event.taget;
    // Notice the ngIf at the title cell definition. The user with id 3 can't set the title of the albums
  }
  gettype(column) {
    return this.regConfig.find(row => row.name == column);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  pageEvent(event) {
    // console.log(event)
  }
  indexsize: number = 10;
  pagesize(event: boolean) {
    if (this.isChecked == true) {
      this.indexsize = 10;
    } else {
      this.indexsize = (this.formout.get('lignes') as FormArray).controls.length + 10;
    }
  }
  isChecked = true;
  async CheckedPagination() {
    // this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      this.indexsize = 10;
    } else {
      this.indexsize = (this.formout.get('lignes') as FormArray).controls.length + 1;
    }
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(100);
    this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;

    // return this.isChecked;
  }
  openDialog(elemn) {
    const dialogRef = this.dialog.open(DeleteAnyDataDialog, {
      width: '400px',
      data: elemn
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined) {
        
        let indexfiltred = (this.formout.get('lignes') as FormArray).controls.findIndex(d => d === elemn);
        (this.formout.get('lignes') as FormArray).controls.splice(indexfiltred, 1);
        this.dataSource.data = (this.formout.get('lignes') as FormArray).controls;
      }
    });
  }
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
