import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Host, Input, OnInit, Optional, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'app-table-popover',
  templateUrl: './table-popover.component.html',
  styleUrls: ['./table-popover.component.scss']
})
export class TablePopoverComponent implements OnInit {
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
  @Input()
  fildesConfig: any[];
  columnsToDisplay: string[] = [];
  @Output() ifClickElement = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('tableConv', { static: false }) scrollFrame: ElementRef;
  @ViewChildren("row", { read: ElementRef }) rowElement: QueryList<ElementRef>;
  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit(): void {
    // console.log(this.listdatasource);
    // console.log(this.fildesConfig);
    this.getShowColumn();


    this.datasource = new MatTableDataSource(this.listdatasource);
    this.datasource.data = this.listdatasource;
    this.datasource.sort = this.sort;
  }
  applyFilter(event, column) {

    if (event.key != "Enter") {
      let filterValue = String(event.target.value);
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
          return String(data[column]).toLowerCase().includes(filterValue.toLocaleLowerCase())
      };
      this.datasource.filter = filterValue;
      let a1 = inisialdata;
      this.colorrows = this.datasource.filteredData;
      moveItemInArray(this.colorrows, this.colorrows.findIndex(item => item[column] == filterValue), 0);
      let a2 = this.colorrows;
      a2 = a2.concat(a1.filter(item => !a2.includes(item)));
      this.datasource.data = a2;
    } else if (event.key == "Enter") {
      if (this.colorrows[0] != undefined) {
        this.fildesConfig.forEach(element => {
          if (element.name == column) {
            element.value = this.colorrows[0][column]
          }
        });
        this.ifClickElement.emit(this.colorrows[0]);
      } else {
        this.popover.close();
      }


    }

  }
  getColorfind(row) {
    if (row == undefined) { return ''; }
    if (this.colorrows.find(item => item == row) != undefined) {
      if (this.colorrows.findIndex(item => item == row) == 0 ) {
        return 'lightblue';
      } else {
        return '#e0e0e0';
      }

    } else {
      return '';
    }
  }
  getType(nameOfColumn: string) {
    return this.fildesConfig.find(w => w.name === nameOfColumn)
  }
  getShowColumn() {
    this.fildesConfig.forEach(element => {
      if (element.name != undefined) {
        this.columnsToDisplay.push(element.name)
      }
    });
    // this.fildesConfig.forEach(element => {
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
