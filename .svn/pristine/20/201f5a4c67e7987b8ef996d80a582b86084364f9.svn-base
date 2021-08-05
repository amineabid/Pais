import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LayoutSidebarComponent } from 'src/app/layout/layout-sidebar/layout-sidebar.component';
import { SidenavService } from '../sidebar/sidebar.service';
// import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  btnmenu: boolean = true;
  iconmenu: string = "menu";
  constructor(public sidebarService:SidenavService) { }

  ngOnInit(): void {
  }
  onClickbtnMenu() {
    // console.log(this.layoutSideBar.snav);
    // this.layoutSideBar.snav.open();
    // if (this.btnmenu) {

    //   this.iconmenu = "clear";
    //   // this.sidebarService.sidebarcomponent.snav.open();
    //   // this.menuState = this.menuState === 'out' ? 'in' : 'out';
    //   this.sidebarService.sidebarcomponent.stylewithsidenav = 250;
    //   // this.sideNavState = false;

    // } else {
    //   this.iconmenu = "menu";
    //   // this.sidebarService.sidebarcomponent.snav.close();
    //   // this.menuState = this.menuState === 'out' ? 'in' : 'out';
    //   // this.layoutSideBar.stylewithsidenav = 60;
    //   // this.sideNavState = true;

    // }
    // this.btnmenu = !this.btnmenu;
    // console.log(this.btnmenu)
    
    if (this.sidebarService.sidebarcomponent.mobileQuery.matches == false) {
      this.sidebarService.sidebarcomponent.snav.open();
      if (this.btnmenu == false) {

        this.iconmenu = "clear";
        this.sidebarService.sidebarcomponent.stylewithsidenav = 250;

      } else {
        this.iconmenu = "menu";
        this.sidebarService.sidebarcomponent.stylewithsidenav = 60;

      }
      this.btnmenu = !this.btnmenu;
    }
    if (this.sidebarService.sidebarcomponent.mobileQuery.matches == true) {
      
      console.log(this.sidebarService.sidebarcomponent.snav.open())
      this.btnmenu = !this.btnmenu;
      if (this.btnmenu == false) {
        this.sidebarService.sidebarcomponent.snav.open();
        this.iconmenu = "clear";
        this.sidebarService.sidebarcomponent.stylewithsidenav = 250;
      } else {
        this.iconmenu = "menu";
        this.sidebarService.sidebarcomponent.snav.close();
      }
      
    }

  }
}
