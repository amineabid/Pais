import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidenavrightComponent } from './sidenavright.component';
// import { RightSidenavComponent } from '../right-sidenav/right-sidenav.component';

@Injectable({
  providedIn: 'root'
})
export class SideBarRightService {


  public sidebarRightComponent: SidenavrightComponent;

  private sidenav: MatSidenav;
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }
  public getstatu() : boolean{
    return this.sidenav.opened;
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle() {
    return this.sidenav.toggle();
  }
}