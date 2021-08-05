import { animate, state, style, transition, trigger } from '@angular/animations';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { MediaMatcher } from '@angular/cdk/layout';
import { DataSource } from '@angular/cdk/table';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Injectable, Input, OnInit, Output, QueryList, VERSION, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { SidenavService } from './sidebar.service';
import { map } from 'rxjs/operators';
import { NavItem } from '../menu-list-item/nav-item';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';

// {
//   'min-width': '60px'
// }"@media(max-width: 600px){.mat-drawer{width: 0px; }}")

export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '60px',
    })
      
  ),
  state('open',
    style({
      'min-width': '250px'
    })
  ),
  transition('close => open', animate('100ms ease-in')),
  transition('open => close', animate('100ms ease-in')),
]);

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [onSideNavChange]
})
export class SidebarComponent implements OnInit {
  @ViewChild('snav', { static: true }) public snav: MatSidenav;
  mobileQuery: MediaQueryList;
  @Output() public sideNavState: boolean = false;
  @Output() stylewithsidenav: any = 60;
  private _mobileQueryListener: () => void;
  @ViewChild('snav', { static: false }) scrollFrame: any;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
     public serviceSideBar: SidenavService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


  }
  OpenSideNav() {
    if (this.mobileQuery.matches == false) {
      this.sideNavState = !this.sideNavState;
    }
    // let el = this.scrollFrame.find((r) => {
    //   if (String(r.nativeElement.firstElementChild.innerText).toLowerCase() == String(event.target.value).toLowerCase()) {
    //     return r.nativeElement
    //   }
    // })
    // if (el != undefined) {
    //   el.nativeElement.scrollIntoView({
    //     behavior: "smooth", inline: "start", block: "start"
    //   });
    // }
    // console.log(this.scrollFrame._elementRef.nativeElement.scrollWidth)
    // console.log(this.scrollFrame._elementRef.nativeElement.scrollHeight)
    
    // console.log(this.scrollFrame._elementRef.nativeElement.style.overflowY =  "visible")
    // this.scrollFrame.nativeElement.scroll({
    //   top: 0,
    //   left: this.scrollFrame.nativeElement.scrollHeight,
    //   behavior: 'smooth'
    // });
    this.scrollFrame._elementRef.nativeElement.children[0].style.overflowY = "visible"
    this.scrollFrame._elementRef.nativeElement.children[0].style.overflowX = "auto"
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.scrollFrame._elementRef.nativeElement.children[0].style.overflow = "hidden"
    // this.scrollFrame._elementRef.nativeElement.children[0].style.overflowY = "visible"
  }
  expended=false;
  CloseSideNav() {
    if (this.mobileQuery.matches == false) {
      this.sideNavState = !this.sideNavState;
    } 
    this.scrollFrame._elementRef.nativeElement.children[0].style.overflowY = "hidden"
    this.scrollFrame._elementRef.nativeElement.children[0].style.overflowX = "hidden"
        //console.log(localStorage.menuSelected = false);
  }
  ngOnDestroy(): void {
    this.serviceSideBar.setSidenav(this.snav);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.mobileQuery.matches == true) {
      this.serviceSideBar.close();
    }else{
      this.serviceSideBar.open();
    }
    
  }

  ngOnInit(): void {
    this.serviceSideBar.setSidenav(this.snav);
    this.serviceSideBar.sidebarcomponent = this;
    if (this.mobileQuery.matches == true) {

      this.stylewithsidenav = 250;
      this.snav.close();
    } else {
      this.stylewithsidenav = 60;
      this.snav.open();
    }
  
  }
  version = VERSION;
  @Input()
  navItems: NavItem[] = [
    {
      displayName: 'parametre',
      iconName: 'settings',
      children: [
        {
          displayName: 'Societe',
          iconName: 'group',
          
          // route: '#'
        },
        {
          displayName: 'Creation Dossier',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Gestion Documentation GC',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Type CNSS',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Banque',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Compatibilite',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Service',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Qualification',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Situation de recrutement',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Grille de Salaire',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Indemnite',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Cnss Convention',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Prime Convention',
          iconName: 'group',
          route: 'admin/PrimConvention'
        },
        {
          displayName: 'Type de Paie',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Personnel',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Personnel',
          iconName: 'group',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Convention',
          iconName: 'group',
          route: 'admin/convention'
        }
      ]
    },
    // {
    //   displayName: 'Mouvement',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'Etats',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'T.Mensuel',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'Cloture',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'T.Annuel',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'CNSS',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'Pret',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'Contact',
    //   iconName: 'recent_actors',
    // },
    // {
    //   displayName: 'Conge',
    //   iconName: 'recent_actors',
    // },
  ];
}
