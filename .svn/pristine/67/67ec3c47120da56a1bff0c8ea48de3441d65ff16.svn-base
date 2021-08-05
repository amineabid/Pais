import {Component, HostBinding, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NavItem} from './nav-item';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { SidenavService } from '../sidebar/sidebar.service';
// import {NavService} from '../nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  @Input() expanded: boolean=false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  constructor(public navService: SidenavService,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      if(item.route!=undefined){
        this.router.navigate([item.route]);
      }
       
      //this.navService.closeSidebar64();
    }
    if (item.children && item.children.length) {
      
      
      this.expanded = !this.expanded;
      // localStorage.setItem('menuSelected', JSON.stringify(this.expanded));
      // if (localStorage.menuSelected == false) {
      //   this.expanded = false;
      // } else {
      //   this.expanded = true;
      // }
    }

    
  }
}
