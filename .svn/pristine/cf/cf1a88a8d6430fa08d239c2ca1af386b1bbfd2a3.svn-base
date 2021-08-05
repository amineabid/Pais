import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideBarRightService} from './sidebarright.service';
@Component({
  selector: 'app-sidenavright',
  templateUrl: './sidenavright.component.html',
  styleUrls: ['./sidenavright.component.css']
})
export class SidenavrightComponent implements OnInit {

  @ViewChild('sideNav', { static: true }) sideNav: MatSidenav;
  @ViewChild('modifierCompoent', { read: ViewContainerRef }) public modifierCompoent: ViewContainerRef;

  @Output() idSideBar:any;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public onSideNavChange: boolean;
  //public component: Type<any>, public data: any,
  constructor(media: MediaMatcher,
     changeDetectorRef: ChangeDetectorRef,
     private sideNavBarRight: SideBarRightService,
    private crf: ComponentFactoryResolver ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.idSideBar =this.sideNav;
    
   }

  ngOnInit(): void {
    // this.sideNavBarRight.setSidenav(this.sideNav);
    this.sideNavBarRight.sidebarRightComponent = this;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.sideNavBarRight.setSidenav(this.sideNav);
    this.sideNavBarRight.sidebarRightComponent=this;
  }
  CreateComponentOnSideBar(name:string,component:any)  {
    if(name!=""){
      this.modifierCompoent.clear();
      this.modifierCompoent.createComponent(this.crf.resolveComponentFactory(component));
      this.sideNav.open();
    }else{
      this.modifierCompoent.clear();
      this.modifierCompoent.createComponent(this.crf.resolveComponentFactory(component));
      if (this.sideNav.opened) {
        this.sideNav.close()
      } else {
        this.sideNav.open();
      }
    }



  }
}
