import { SelectionModel } from '@angular/cdk/collections';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, OnInit, Optional, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'app-table-popover-simple',
  templateUrl: './table-popover-simple.component.html',
  styleUrls: ['./table-popover-simple.component.scss']
})
export class TablePopoverSimpleComponent implements OnInit {
  @Input()
  public get listdatasourcee() {
    return this._listdatasource;
  }
  public set listdatasourcee(value) {
    this.listdatasource = this._listdatasource = value;
  }
  listdatasource = [];
  private _listdatasource;
  datasource: MatTableDataSource<any> = new MatTableDataSource(this.listdatasource);
  colorrows: any[] = [];


  @Input() listdatafiltred=undefined;
  @Input()
  public get fildesConfigg(): any[] {
    return this._fildesConfig;
  }
  public set fildesConfigg(value: any[]) {
    this._fildesConfig =this._fildesConfig = value;
    
  }
  private _fildesConfig: any[];
  // _fildesConfig:any[]=[];
  columnsToDisplay: string[] = [];
  @Output() ifClickElement = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  @ViewChild('tableConv', { static: false }) scrollFrame: ElementRef;
  @ViewChildren("row", { read: ElementRef }) rowElement: QueryList<ElementRef>;
  constructor(@Optional() @Host() public popover: SatPopover, private cdr: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdr.detectChanges();

  }
  ngOnInit(): void {
    // console.log(this.listdatasource);
    // console.log(this._fildesConfig);
    this.getShowColumn();


    this.datasource = new MatTableDataSource(this.listdatasource);
    this.datasource.data = this.listdatasource;
    this.datasource.sort = this.sort;



    // this._fildesConfig.forEach(val => {
    //   // console.log(val.value);
    //   if (val.value != undefined) {
    //     this.applyFilter(val.value, val.name);
    //   }
    // });
    // console.log(this.listdatafiltred);
    
    if (this.listdatafiltred != null && this.listdatafiltred != undefined)  {
      if (this.listdatafiltred.target != null && this.listdatafiltred.target != undefined) {
        this.applyFilter(this.listdatafiltred, this.listdatafiltred.target.name);
      }
    }
  }
  applyFilter(event, column) {
    
    if (event.key != "Enter") {
      // this.popover.open();
      let filterValue = String(event.target.value);
      // let filterValue = String(event);
      filterValue = filterValue.toLowerCase();
      const inisialdata = this.listdatasource;
      if (filterValue == "") {
        // this.datasource.data = inisialdata;
        this.colorrows = [];
        this.datasource.filter = "";
        return;
      }
      // this.colorrows = [];
      this.datasource.filterPredicate = (data: any, filter: string) => {
        return String(data[column]).toLowerCase().includes(filterValue)
      };
      this.datasource.filter = filterValue;
      let a1 = inisialdata;
      this.colorrows = this.datasource.filteredData;
      moveItemInArray(this.colorrows, this.colorrows.findIndex(item => item[column] == filterValue), 0);
      let a2 = this.colorrows;
      a2 = a2.concat(a1.filter(item => !a2.includes(item)));
      this.datasource.data = a2;
    } else if (event.key == "Enter") {
      console.log(this.colorrows[0]);
      
      if (this.colorrows[0] != undefined) {
        this._fildesConfig.forEach(element => {
          if (element.name == column) {
            element.value = this.colorrows[0][column]
          }
        });
        this.ifClickElement.emit(this.colorrows[0]);
      } else {
        // this.popover.close();
      }


    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (this.listdatafiltred != null && this.listdatafiltred != undefined) {
      this.applyFilter(this.listdatafiltred, this.listdatafiltred.target.name);
    }
    
  }
  getColorfind(row) {
    if (row == undefined) { return ''; }
    if (this.colorrows.find(item => item == row) != undefined) {
      if (this.colorrows.findIndex(item => item == row) == 0) {
        return 'lightblue';
      } else {
        return '#e0e0e0';
      }

    } else {
      return '';
    }
  }
  // applyFilter(event, column) {
  //   let filterValue = String(event);

  //   const datasource2 = this.datasource.data;
  //   filterValue = filterValue.toLowerCase();
    
  //   if (filterValue == "") {
  //     this.datasource.data = datasource2;
  //     this.colorrows = [];
  //     return;
  //   }


  //   this.datasource.filterPredicate = (data: any, filter: string) => {
      
  //     return String(data[column]).toLowerCase().includes(filterValue)
  //   };
  //   this.datasource.filter = filterValue;
    
    
  //   let a1 = this.datasource.data;
  //   console.log(filterValue);

  //   this.colorrows = this.datasource.filteredData;
  //   moveItemInArray(this.colorrows, this.colorrows.findIndex(item => item[column] == filterValue), 0);
  //   let a2 = this.colorrows;
  //   a2 = a2.concat(a1.filter(item => !a2.includes(item)));
  //   this.datasource.data = a2;
  // }
  // getColorfind(row) {
  //   if (row == undefined) { return ''; }
  //   if (this.colorrows.find(item => item == row) != undefined) {
  //     if (this.colorrows.findIndex(item => item == row) == 0) {
  //       return 'lightblue';
  //     } else {
  //       return '#e0e0e0';
  //     }

  //   } else {
  //     return '';
  //   }
  // }
  getType(nameOfColumn: string) {
    return this._fildesConfig.find(w => w.name === nameOfColumn)
  }
  getShowColumn() {
    this._fildesConfig.forEach(element => {
      if (element.name != undefined) {
        this.columnsToDisplay.push(element.name)
      }
    });
    // this._fildesConfig.forEach(element => {
    //   if (element.column_show == false) {
    //     let index = this.columnsToDisplay.indexOf(element.name)
    //     this.columnsToDisplay.splice(index, 1);
    //   }
    // });
  }
  showelement(element) {
    this.ifClickElement.emit(element);
  }
}
