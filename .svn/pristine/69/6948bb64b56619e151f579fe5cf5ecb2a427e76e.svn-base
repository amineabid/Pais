import { MediaMatcher } from '@angular/cdk/layout';
import { Component, EventEmitter, ChangeDetectorRef, Input, OnInit, Output, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DataTableService } from 'src/app/share/component/data-table/data-table.service';
import { SidenavService } from 'src/app/share/component/sidebar/sidebar.service';
import { SideBarRightService } from 'src/app/share/component/sidenavright/sidebarright.service';
import { AddUpdateConventionComponent } from './add-update-convention/add-update-convention.component';
import { ConventionService } from 'src/controller/convention.service';
// import { DeleteConventionComponent } from './delete-convention/delete-convention.component';
import { ListConventionComponent } from './list-convention/list-convention.component';
// import {
//   MatSnackBar,
//   MatSnackBarHorizontalPosition,
//   MatSnackBarVerticalPosition,
// } from '@angular/material/snack-bar';
// import { HtmlParser } from '@angular/compiler';
@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.scss']
})
export class ConventionComponent implements OnInit {

   @ViewChild('sideNav', { static: true }) sidenav: MatSidenav;
  @ViewChild('modifierCompoent', { read: ViewContainerRef }) public modifierCompoent: ViewContainerRef;
  @ViewChild('listConv') public lscc:ListConventionComponent;

  // dymmyComponent:ListConventionComponent;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(private crf: ComponentFactoryResolver,
      private sidenavRightService: SideBarRightService,
      media: MediaMatcher, 
      changeDetectorRef: ChangeDetectorRef,
    // private _snackBar: MatSnackBar,
    private serviceDataTable: DataTableService
      ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
   }
   ngOnDestroy(): void {
     this.mobileQuery.removeListener(this._mobileQueryListener);
   }
  ngOnInit(): void {
    // this.sidenavService.setSidenav(this.sidenav);
  }
  OnCloseSide(){
  }
 
  menufunction(){
    
  }
  toggelsidenav(component){
    if (component=='Create'){
      // this.conventionService.convention = null;
      this.serviceDataTable.sendDataToUpdate = null;
      this.sidenavRightService.sidebarRightComponent.CreateComponentOnSideBar(component, AddUpdateConventionComponent);
      // this.sidenavService.setConvention(null);
      // this.conventionService.convention = null;
      // this.modifierCompoent.clear();
      // this.modifierCompoent.createComponent(this.crf.resolveComponentFactory(AddUpdateConventionComponent));
      // if(this.sidenav.opened){
      //   this.sidenav.close()
      // }else{
      //   this.sidenav.open();
      // }
      
    }
    // else if(component=="Delete"){
    //   this.dymmyComponent = DeleteConventionComponent;
    //   this.sidenav.open()
    // }else{
    //   this.dymmyComponent = ListConventionComponent;
    //   this.sidenav.open()
    // }
    
  }
  toggelSideBarRight(){
    this.sidenavRightService.toggle();
  }
}

