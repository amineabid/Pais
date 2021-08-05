import { MapType } from '@angular/compiler';
import { noUndefined } from '@angular/compiler/src/util';
import { AfterViewInit, Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SideBarRightService } from '../sidenavright/sidebarright.service';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {

  // type:MapType;
  //colum with data source w pagination w sort init
  columnsToDisplay: string[] ;
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() displayedColumns: string[] ;
  // expandedElement: Convention | null;

  @Input() listconvention: any[] = [];
  Veriflistconvention: any[] = [];

  // myControl = new FormControl();
  // options: string[] = [];
  // filteredOptions: Observable<string[]>;
  filterSelectObj = [];
  filterValues = {};
  //variable to show progress
  showprogress: boolean = false;

  @Input() componentAddUpdate:any;
  @Input() componentSupp:any;
  constructor(
    public dialog: MatDialog,
    private serviceSideBarRighht: SideBarRightService,
    public serviceDataTable: DataTableService
  ) { 
    
  }
  //for delete convention
  openDialog(conv: any) {
    const dialogRef = this.dialog.open(this.componentSupp, {
      width: '400px',
      data: conv
    });

    dialogRef.afterClosed().subscribe(async result => {
      // this.ngOnInit();
      this.ngOnInit();
      // this.parent.openSnackBar("Convention Supprimée");
    });
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.dataSource.data);
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    // this.serviceDataTable.componentResponse.ngOnInit();
    this.serviceDataTable.dataTableComponent = this;
    
    this.columnsToDisplay = this.serviceDataTable.columnsToDisplay;
    this.displayedColumns = this.columnsToDisplay.slice();
    this.dataSource = this.serviceDataTable.dataSource;
    this.listconvention = this.dataSource.data;
    this.filterSelectObj = this.serviceDataTable.filterSelectObj;
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.listconvention, o.columnProp);
    });
    this.dataSource.filterPredicate = this.createFilter();
    
    this.dataSource.paginator =this.paginator;
    
    this.componentAddUpdate = this.serviceDataTable.compoenntAddMod;
    this.componentSupp = this.serviceDataTable.componentDelete;
    this.showprogress = false;
    // console.log(this.serviceDataTable.getDataSource().data);
    
  }

  async toggleRightSidenav(data: any) {
    this.serviceDataTable.sendDataToUpdate = data;
    this.serviceSideBarRighht.sidebarRightComponent.CreateComponentOnSideBar("modifier", this.componentAddUpdate);
  }

  refrechdata(){
    this.serviceDataTable.componentResponse.ngOnInit();
    this.ngOnInit();
    this.columnsToDisplay = this.serviceDataTable.columnsToDisplay;
    this.displayedColumns = this.columnsToDisplay.slice();
    this.dataSource = this.serviceDataTable.dataSource;
    this.listconvention = this.dataSource.data;
    this.filterSelectObj = this.serviceDataTable.filterSelectObj;
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.listconvention, o.columnProp);
    });
    this.dataSource.filterPredicate = this.createFilter();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // Called on Filter change
  filterChange(filter, event) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      //console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (String(data[col]).toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }


  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  
}
