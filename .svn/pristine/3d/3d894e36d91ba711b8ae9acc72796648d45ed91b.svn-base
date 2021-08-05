import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableComponent } from './data-table.component';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  public dataTableComponent: DataTableComponent;
  public componentResponse:any;

  columnsToDisplay:string[];
  dataSource:any;
  compoenntAddMod:any;
  componentDelete:any;
  filterSelectObj:string[];

  sendDataToUpdate:any;
  constructor() { }
  public setTable(columnsToDisplay: string[],
     dataSource: MatTableDataSource<any>,
     filterSelectObj:any,
    compoenntAddMod:any,
    componentDelete:any){
    this.columnsToDisplay = columnsToDisplay;
    this.dataSource = dataSource;
    this.compoenntAddMod = compoenntAddMod;
    this.componentDelete = componentDelete;
    this.filterSelectObj = filterSelectObj;
    // this.dataTableComponent.dataSource.paginator = this.paginator;
    // this.dataTableComponent.dataSource.sort = this.sort;
    
  }
  public getDataSource(): MatTableDataSource<any>{

    return this.dataSource;
  }
}
