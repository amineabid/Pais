import { Injectable, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar.component';
// import { RightSidenavComponent } from '../right-sidenav/right-sidenav.component';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  // public sidebarCompo: SidebarComponent;
  // @ViewChild(SidebarComponent) public sidebarCompo: SidebarComponent;
  public sidenav: MatSidenav ;
  public sidebarcomponent:SidebarComponent;
  
  // private conv: Observable<Convention>;
  // private convv: Observable<Convention>;
  // Observable string source
  // private dataStringSource = new BehaviorSubject<Convention | undefined>(undefined);

  // Observable string stream
  // dataString$ = this.dataStringSource.asObservable();
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }
  public getSidenav(): MatSidenav{
    return this.sidenav;
  }
  public closeSidebar64(){
    return this.sidebarcomponent.CloseSideNav();
  }
 
  public setProprtieSidenav(width:any,conent:any){
      
  }
  public open() {
    // this.sidenav = this.sidebarCompo.snav;
    return this.sidenav.open();
  }
  public getstatu() : boolean{
    // this.sidenav = this.sidebarCompo.snav;
    return this.sidenav.opened;
  }

  public close() {
    // this.sidenav = this.sidebarCompo.snav;
    return this.sidenav.close();
  }

  public toggle() {
    // this.sidenav = this.sidebarCompo.snav;
    return this.sidenav.toggle();
  }
}