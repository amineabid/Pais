import { Component, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Event, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { AppLoaderService } from './share/component/app-loader/app-loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Paie';
  public isOnline: boolean = navigator.onLine;
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    
    return false;
    //I have used return false but you can your other functions or any query or condition
  }
  @HostListener('window:hashchange', ['$event'])
  onHashChange(event) {
    
  }  
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    //console.log(this.isOnline)
    //console.log(event)
  }
  timeout;
  routerChanged = true;
  constructor(private sophiaLoader: AppLoaderService,private router: Router){


  router.events.subscribe((event: Event) => {
    

    if (event instanceof NavigationStart) {
      // Show loading indicator
      this.sophiaLoader.open('', {width: '320px'});
      this.routerChanged = true;
    }

    if (event instanceof NavigationEnd) {
      // Hide loading indicator
      this.sophiaLoader.close();
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.routerChanged = false;
      }, 1000);
    }
  });
    // window.addEventListener("online", () => {
    //   alert("Your browser is working online.");
    // });
    // window.addEventListener("offline", () => {
    //   alert("Your browser is working offline.");
    // });
  }
}
