import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
@Injectable({
  providedIn: 'root'
})
export class SnackebarService {

  constructor(private snackBar: MatSnackBar) { }

  /* It takes three parameters  
      1.the message string  
      2.the action  
      3.the duration, alignment, etc. */

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, "", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    // this.snackBar.openFromComponent(SnackComponent,message, {
    //   duration: 2000,
    //   horizontalPosition: 'right',
    //   verticalPosition: 'top',
    //   announcementMessage:message
    // });
    return message;
  } 
}

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `{{message}}`,
  // styles: [`
  //   .example-pizza-party {
  //     color: hotpink;
  //   }
  // `],
})
export class SnackComponent { 
  constructor(private servicceSnack:SnackebarService){

  }
  message = this.servicceSnack.openSnackBar;
}