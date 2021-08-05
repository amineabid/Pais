import { Component, Input, Optional, Host, ViewChild, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { FieldConfig } from '../../componentForms/field.interface';

@Component({
  selector: 'inline-edit',
  styleUrls: ['inline-edit.component.scss'],
  template: `
    <form (ngSubmit)="onSubmit()">
      
<!-- <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>(change)="oNkeyUp($event.target.value)" -->
      <mat-form-field appearance="outline">
        <mat-label>{{labell()}}</mat-label>
        <input matInput [type]="typeee()"
        (change)="oNChange($event)"
        (keyup)="oNkeyUp($event)" 
        [placeholder]="labell()" 
        maxLength="1000" 
        name="this.field.name" 
        [(ngModel)]="comment">
        <mat-hint align="end">{{comment?.length || 0}}/1000</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">CANCEL</button>
        <button mat-button type="submit" color="primary">SAVE</button>
      </div>
    </form>
      <div #table *ngIf="this.field.t" class="tabledataclass"  >
        <mat-table  [dataSource]="dataSourceMat" matSort >
            <ng-container [matColumnDef]="column" *ngFor="let column of displayedColumns">
                <mat-header-cell *matHeaderCellDef  mat-sort-header="{{column}}" >
                  <div>
                    {{column}}
                  </div>
                    <!--  -->
                </mat-header-cell>
                <mat-cell *matCellDef="let element" (dblclick)="onSubmit()" (click)="showelement(element)" >
                    {{element[column]}}
                </mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns;"></mat-header-row>
            <mat-row #row [ngStyle]="{'background-color': getColorfind(row) ,'cursor':'pointer'}" *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
        <!-- *ngIf="field.table!=undefined" <mat-paginator  [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator> -->
  </div>
  `
})
export class InlineEditComponent implements AfterViewInit,OnDestroy {
  @Input()
  displayedColumns = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('table', { static: false }) scrollFrame: ElementRef;
  @ViewChildren("row", { read: ElementRef }) rowElement: QueryList<ElementRef>;
  @Input()
  initialData: any[] = [];
  dataSourceMat: MatTableDataSource<any> = new MatTableDataSource(this.initialData);
  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.comment = this._value = x;
  }
  private _value = '';
  @Input()
  private typee:any="text";
  typeee() { 
    return this.typee; 
  }
  @Input()
  private label:any="";
  labell(){
    return this.label;
  }
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
}
  // set typee(x: any) {
  //   this.typee = this._type = x;
  // }
  // private _type = '';
  /** Form model for the input. */
  comment = '';
  colorrows=[];
  getColorfind(row){
    if (row == undefined) { return ''; }
    if (this.colorrows.find(item => item == row)!=undefined) {
      return 'green';
    } else {
      return '';
    }
  }
  constructor(@Optional() @Host() public popover: SatPopover) {
    
   }
   async scrolldown(){
     function sleep(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
     }
     await sleep(300);
     if (this.field.table != undefined) {

       let el = this.rowElement.find((r) => {
         if (String(r.nativeElement.firstElementChild.innerText).toLowerCase() == String(this.comment).toLowerCase()) {
           return r.nativeElement
         }
       })

       if (el != undefined) {
         el.nativeElement.scrollIntoView({
           behavior: "smooth", inline: "start", block: "start"
         });
       }
       // await sleep(1000);
       this.dataSourceMat.data.forEach(element => {
         if (String(element[this.displayedColumns[0]]).toLowerCase() == String(this.comment).toLowerCase()) {
           this.colorrows.push(element)
         }
       });
     }
   }
  oNChange(event){
    
    // this.colorrows = [];
    // if (this.field.table != undefined) {

    //   let el = this.rowElement.find((r) => {
    //     if (String(r.nativeElement.firstElementChild.innerText).toLowerCase() == String(event.target.value).toLowerCase()) {
    //       return r.nativeElement
    //     }
    //   })

    //   if (el != undefined) {
    //     el.nativeElement.scrollIntoView({
    //       behavior: "smooth", inline: "start", block: "start"
    //     });
    //   }
    //   // await sleep(1000);
    //   this.dataSourceMat.data.forEach(element => {
    //     if (String(element[this.displayedColumns[0]]).toLowerCase() == String(event.target.value).toLowerCase()) {
    //       this.colorrows.push(element)
    //     }
    //   });
    // }
  }
  @Input()
  field: FieldConfig;
  group: FormGroup;
  nameinput:string="";
  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.comment = this.value || '');
    }
    if (this.field.table!=undefined){
      this.field.table.forEach(element => {
        element.displayedColumns.forEach(col => {
          this.displayedColumns = col.columns;
        });
        this.initialData = element.data;
      });
      this.dataSourceMat.data = this.initialData;
      this.dataSourceMat.sort = this.sort;

      
    }
    this.colorrows = [];
    this.scrolldown();
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // await sleep(300);
    
    // this.oNkeyUp(this.comment)

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  showelement(element) {
    // if (this.popover) {
    //   this.popover.close(this.comment);
    // }
    // console.log(Object.values(element)[0])
    // console.log(element[this.displayedColumns[0]])
    // this.comment = String(element[this.displayedColumns[0]]);
    this.comment = element[this.displayedColumns[0]];
    // this.oNkeyUp(this.comment)
    //alert(element)
  }
  onSubmit() {
    if (this.popover) {
      this.popover.close(this.comment);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
      // this.initialData = [];
      // this.dataSourceMat = new MatTableDataSource([]);
    }
    // this.ngOnInit()
  }
  oNkeyUp(event){

    // console.log(event)
    if (event!=undefined) {
      if (event.target.value == null) {
        this.colorrows = [];
        return;
      }
      if (event.key != "Enter") {
        if (event.target.value != "") {
          // this.popover.open();
          this.colorrows = [];
          
          let el = this.rowElement.find((r) => {
            if (String(r.nativeElement.firstElementChild.innerText).toLowerCase() == String(event.target.value).toLowerCase()) {
              return r.nativeElement
            }
          })
          if (el != undefined) {
            el.nativeElement.scrollIntoView({
              behavior: "smooth", inline: "start", block: "start"
            });
          }
          this.dataSourceMat.data.forEach(element => {
            if (String(element[this.displayedColumns[0]]).toLowerCase() == String(event.target.value).toLowerCase()) {
              this.colorrows.push(element)
            }
          });

        } else {
          // this.popover.close();
        }
      } else {
        if (event.target.value != "") {
          // this.showelement(this.colorrows[0])
          // this.popover.close();
        }
      }
    }
    // this.colorrows = [];if(filterValue==""){
    // event = event.target.value;
    // if (event == null) {
    //   this.colorrows = [];
    //   return;
    // }

    // this.dataSourceMat.filterPredicate = (data: any, filter: string) => data[this.displayedColumns[0]] == event;
    // this.dataSourceMat.filter = event;
    // let a1 = this.dataSourceMat.data;
    // let a2 = this.dataSourceMat.filteredData;
    // a2 = a2.concat(a1.filter(item => !a2.includes(item)));
    // this.dataSourceMat.data = a2;
    // this.colorrows = this.dataSourceMat.filteredData;
  }
}