import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SatPopover } from '@ncstate/sat-popover';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-table',
  template: `
  <form (ngSubmit)="onSubmit()">
    <mat-form-field appearance="outline" [satPopoverAnchor]="p"(click)="p.open();">
      <input matInput  [formControlName]="field.name" [placeholder]="field.label"  [type]="field.inputType" maxLength="140" name="comment" [(ngModel)]="comment">
      <mat-hint align="end">{{comment?.length || 0}}/140</mat-hint>
    </mat-form-field>

    <div class="actions">
      <button mat-button type="button" color="primary" (click)="onCancel()">CANCEL</button>
      <button mat-button type="submit" color="primary">SAVE</button>
    </div>
  </form>
<sat-popover #p id="p" hasBackdrop xAlign="start" yAlign="start" verticalAlign="below" forceAlignment (opened)="showtable($event)" (closed)="update($event)">

  <div class="tabledataclass">
        <mat-table #table [dataSource]="dataSourceMat">
            <ng-container [matColumnDef]="column" *ngFor="let column of displayedColumns">
                <mat-header-cell *matHeaderCellDef   >
                    {{column}}
                </mat-header-cell>
                <mat-cell *matCellDef="let element" (click)="showelement(element)" >
                    {{element[column]}}
                </mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns;sticky: true"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
        <mat-paginator  [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
  </div>
</sat-popover>
  `,
  styles: []
})
export class TableComponent implements OnInit {
  @Input()
  displayedColumns = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  initialData: any[] = [];
  dataSourceMat: MatTableDataSource<any> = new MatTableDataSource([]);
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.comment = this._value = x;
  }
  private _value = '';
  @Input()
  private typee: any = "text";
  typeee() {
    return this.typee;
  }
  // set typee(x: any) {
  //   this.typee = this._type = x;
  // }
  // private _type = '';
  /** Form model for the input. */
  comment = '';


  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.field.table.forEach(element => {
      element.displayedColumns.forEach(col => {
        this.displayedColumns=col.columns;
      });
      this.initialData = element.data;
    });
    this.dataSourceMat.data = this.initialData;
    this.dataSourceMat.sort = this.sort;
    this.dataSourceMat.paginator = this.paginator;
  }
  @ViewChild(SatPopover) popover: SatPopover;
  showelement(element){
    if (this.popover) {
      this.popover.close(this.comment);
    }
    this.comment=element[0];
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
    }
  }
  update(comment) {
    // this.convention.data = this.convention2;
    // let value = (document.getElementById("a") as HTMLInputElement).value;
    // console.log(value)
    // this.showdataligne_conv(value)
    // this.datasource.update(copy);
  }
  showtable(event) {
    // this.applyFilter(this.elm.cod_CONV)
  }
}
