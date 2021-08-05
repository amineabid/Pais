import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, Output, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, NavigationStart, Event, Router } from '@angular/router';
import { AppLoaderService } from 'src/app/share/component/app-loader/app-loader.service';
import { HeaderComponent } from 'src/app/share/component/header/header.component';
import { LoadingComponent } from 'src/app/share/component/loading/loading.component';
import { NavItem } from 'src/app/share/component/menu-list-item/nav-item';
import { SidebarComponent } from 'src/app/share/component/sidebar/sidebar.component';
import { SidenavService } from 'src/app/share/component/sidebar/sidebar.service';
import {Service } from 'src/controller/InterfaceService/menu_SideBar'
export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '60px'
    })
  ),
  state('open',
    style({
      'min-width': '250px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrls: ['./layout-sidebar.component.css'],
  animations: [ onSideNavChange]
})
export class LayoutSidebarComponent implements OnInit {
  // @ViewChild('snav', { static: true }) snav: MatSidenav;
  @ViewChild('header', { static: true }) header:any;
  @ViewChild(LoadingComponent) form :LoadingComponent;

  @Output() color: ThemePalette = 'primary';
  @Output() value:50;
  @Output() mode: ProgressSpinnerMode = 'indeterminate';
  timeout;
  routerChanged = true;
  mobileQuery: MediaQueryList;
  constructor(changeDetectorRef: ChangeDetectorRef,media: MediaMatcher,
    private router: Router,private sophiaLoader: AppLoaderService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
            this.sophiaLoader.open(`...`, {width: '320px'});

        this.routerChanged = true;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.sophiaLoader.close()
          this.routerChanged = false;
        }, 1000);
      }
    });
  }
  navItems: NavItem[] = [];

  private _mobileQueryListener: () => void;
  public onSideNavChange: boolean;



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.navItems = Service.MenuItem();
    // if (this.mobileQuery.matches == true) {

    //   this.stylewithsidenav = 250;
    //   this.serviceSidenav.close();
    // }else{
    //   this.stylewithsidenav = 60;
    //   this.serviceSidenav.open();
    // }
    // this.header.iconmenu = this.iconmenu;
    // this.header.btnmenu = false;
  }


}




/*

    {
      displayName: 'Parametre',
      iconName: 'settings',
      children: [
        {
          displayName: 'Societe',
          iconName: 'arrow_right_alt',
          // route: '#'
        },
        {
          displayName: 'Creation Dossier',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Gestion Documentation GC',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Type CNSS',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Banque',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Compatibilite',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Service',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Qualification',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Situation de recrutement',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Grille de Salaire',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Indemnite',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Cnss Convention',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Prime Convention',
          iconName: 'arrow_right_alt',
          route: 'admin/prim-convention'
        },
        {
          displayName: 'Type de Paie',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Personnel',
          iconName: 'arrow_right_alt',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Convention',
          iconName: 'arrow_right_alt',
          route: 'admin/convention'
        }
      ]
    },
    {
      displayName: 'Mouvement',
      iconName: 'pan_tool',
      children: [
        {
          displayName: 'Ouverture de session',
          iconName: 'input',
          // route: '#'
        },
        {
          displayName: 'Generation de mouvement',
          iconName: 'backup',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Mouvement Pointage',
          iconName: 'control_point_duplicate',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Pointage',
          iconName: 'radio_button_checked',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Suppréssion multiple',
          iconName: 'delete_sweep',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Etat pointage',
          iconName: 'radio_button_checked',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Calcul de paie',
          iconName: 'point_of_sale',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Consultation Résultat',
          iconName: 'book_online',
          // route: 'admin/dashbord'
        },
        {
          displayName: 'Etat Quotidiens',
          iconName: 'history_edu',
          // route: 'admin/dashbord'
          children:[
            {
              displayName: 'Etat de paie',
              iconName: 'history_edu',
            }
          ]
        }
      ]
    },
    {
      displayName: 'Etats',
      iconName: 'history_edu',
    },
    {
      displayName: 'T.Mensuel',
      iconName: 'insert_invitation',
    },
    {
      displayName: 'Cloture',
      iconName: 'account_balance_wallet',
    },
    {
      displayName: 'T.Annuel',
      iconName: 'date_range',
    },
    {
      displayName: 'CNSS',
      iconName: 'groups',
    },
    {
      displayName: 'Pret',
      iconName: 'alarm_on',
    },
    {
      displayName: 'Contact',
      iconName: 'contact_phone',
    },
    {
      displayName: 'Conge',
      iconName: 'event_busy',
    },
    {
      displayName: 'Administartion',
      iconName: 'admin_panel_settings',
    },
    {
      displayName: 'Manuels',
      iconName: 'beenhere',
      children:[
        {
          displayName: 'PaieGC',
          iconName: '',
        },
        {
          displayName: 'Loi finance',
          iconName: '',
          children: [
            {
              displayName: '2018',
              iconName: '',
              children:[
                {
                  displayName: 'Fr',
                  iconName: '',
                  children:[
                    {
                      displayName: 'LF2018',
                      iconName: '',
                    },
                    {
                      displayName: 'Note COMMUNS N1',
                      iconName: '',
                    },
                  ]
                },
                {
                  displayName: 'Ar',
                  iconName: '',
                },
              ]
            },
            {
              displayName: '2017',
              iconName: '',
              children: [
                {
                  displayName: 'Fr',
                  iconName: '',

                },
                {
                  displayName: 'Ar',
                  iconName: '',
                  children: [
                    {
                      displayName: 'LF2017',
                      iconName: '',
                    }
                  ]
                },
              ]
            },
            {
              displayName: '2016',
              iconName: '',
              children: [
                {
                  displayName: 'Fr',
                  iconName: '',

                },
                {
                  displayName: 'Ar',
                  iconName: '',
                },
              ]
            },
          ]
        },
        {
          displayName: 'Nouveauté',
          iconName: '',
          children:[
            {
              displayName: 'Taux de cotisation Cnss',
              iconName: '',
            }
          ]
        },
      ]
    },
    {
      displayName: 'Help',
      iconName: 'help',
    },
*/