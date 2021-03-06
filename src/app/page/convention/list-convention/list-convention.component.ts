import { AfterViewInit, Component, ComponentFactoryResolver, Inject, Injector, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ConventionService } from "src/controller/convention.service";
import { Convention } from "src/model/convention";
import { SidenavService } from "src/app/share/component/sidebar/sidebar.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConventionComponent } from '../delete-convention/delete-convention.component';
import { AddUpdateConventionComponent } from '../add-update-convention/add-update-convention.component';
import { ConventionComponent } from '../convention.component';
import { SideBarRightService } from 'src/app/share/component/sidenavright/sidebarright.service';
import { DataTableService } from 'src/app/share/component/data-table/data-table.service';
import { DataTableComponent } from 'src/app/share/component/data-table/data-table.component';

@Component({
  selector: 'app-list-convention',
  templateUrl: './list-convention.component.html',
  styleUrls: ['./list-convention.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListConventionComponent implements AfterViewInit {
  
  //colum with data source w pagination w sort init
  columnsToDisplay: string[] = ['action','cod_CONV','lib_CONV'];
  dataSource: MatTableDataSource<Convention> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = this.columnsToDisplay.slice();
  // expandedElement: Convention | null;

  listconvention:Convention[]=[];
  Veriflistconvention: Convention[]=[];

  // myControl = new FormControl();
  options: string[] =[];
  // filteredOptions: Observable<string[]>;
  filterSelectObj = [];
  filterValues = {};

  constructor(
    private conventionService: ConventionService, 
    public dialog: MatDialog, 
    private serviceSideBarRighht: SideBarRightService,
    private serviceDataTable: DataTableService
    ) { 

  }
  //for delete convention
  openDialog(conv:Convention) {
    const dialogRef = this.dialog.open(DeleteConventionComponent, {
      width: '400px',
      data: conv
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      this.ngOnInit();
      // this.parent.openSnackBar("Convention Supprim??e");
    });
  }
  //methode pour affichage sideright de modification et addition convention

  async toggleRightSidenav(conv:Convention) {
    
    this.conventionService.convention = conv;
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // if (this.parent.sidenav.opened == true) {
    // }
      // this.sidenav.close();
    this.serviceSideBarRighht.sidebarRightComponent.CreateComponentOnSideBar("modifier", AddUpdateConventionComponent);
    this.conventionService.convention = conv;
      // await sleep(300);
      // console.log(this.sidenav.getstatu());
    
    // this.parent.sidenav.open();
    // this.sidenav.open();
  }
  
  ngAfterViewInit(): void {
    // this.datatable.ngOnInit();
  }
  //variable to show progress
  showprogress:boolean=false;
  //methode de init comopenent
   ngOnInit(): void {
    // this.showprogress = false;

    this.conventionService.getAll().then((conventions: any[]) => {
      this.listconvention = conventions;
      // console.log(Object.keys(conventions[0]))
      // console.log(conventions)
      let ls: string[] = ["action"] ;
      ls = ls.concat(Object.keys(conventions[0]));
      this.columnsToDisplay = ls;
      this.dataSource = new MatTableDataSource<any>(this.listconvention);
      
      // const array: (string | null)[] = ["foo", "bar", null, "zoo", null];
      // const filterdArray: string[] = array.filter((f) =>{
      //   if (f == undefined && f == null){
      //     f="NULL";
      //   }
      // } ) as any;
      // console.log(array);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      // this.options = this.listconvention.map(x => x.lib_CONV);
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(this.listconvention, o.columnProp);
      });

      this.dataSource.filterPredicate = this.createFilter();
      this.filterSelectObj = []
      Object.keys(conventions[0]).forEach(element => {
        this.filterSelectObj.push({
          name: element,
          columnProp: element,
          options: []
        });
      });
      //set list en data table
      this.serviceDataTable.setTable(this.columnsToDisplay,
        this.dataSource,
        this.filterSelectObj,
        AddUpdateConventionComponent,
        DeleteConventionComponent);
      // this.serviceDataTable.dataSource = this.dataSource;
      
      // console.log(Object.keys(JSON.stringify(this.listconvention).slice()))
      
      // for (let obj in jsonData) {
      //   console.log(obj)
      // }
      // console.log(this.serviceDataTable.dataTableComponent.dataSource.paginator);
      // console.log(this.serviceDataTable.dataTableComponent.dataSource.sort);
      this.serviceDataTable.componentResponse = this;
      
      this.showprogress = true;
      
    });

    // setInterval(async () => {
    //   this.conventionService.getAll().subscribe((conventions: Convention[]) => {
    //     this.Veriflistconvention = conventions;
    //   });

    //   if ((JSON.stringify(this.listconvention) != JSON.stringify(this.Veriflistconvention))===true) {
        
    //     //console.log(JSON.stringify(this.listconvention) != JSON.stringify(this.Veriflistconvention));
    //   }
    // }, 1000)
   
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
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
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
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


 //method to filtrage with input select
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }
  //methode filtrage global
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter  = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }