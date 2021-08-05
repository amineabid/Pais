import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DataTableService } from 'src/app/share/component/data-table/data-table.service';
import { SnackebarService } from 'src/app/share/component/snackbar/snackebar.service';
import { ConventionComponent } from '../convention.component';
import { Convention } from 'src/model/convention';
import { ConventionService } from 'src/controller/convention.service';

@Component({
  selector: 'app-delete-convention',
  templateUrl: './delete-convention.component.html',
  styleUrls: ['./delete-convention.component.css']
})
export class DeleteConventionComponent implements OnInit {

 
  updConv: Convention;


  constructor(public dialogRef: MatDialogRef<DeleteConventionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Convention,
    private serviceConvention: ConventionService,
    private serviceSnackBar: SnackebarService,
    private serviceDataTable:DataTableService,
    // private parent: ConventionComponent,
    // @Inject(ConventionComponent) private parent: ConventionComponent
    ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOuiClick() : void{
    this.serviceConvention.deleteConvention(this.data.cod_CONV).subscribe(
      response => {
        console.log(response);
        this.serviceDataTable.componentResponse.ngOnInit();
        // this.parent.lscc.ngOnInit();
        
        this.dialogRef.close();
        this.serviceSnackBar.openSnackBar("✅ Convention supprimée","Ok");
        
      },
      error => {
        console.log(error);
        // this.parent.lscc.ngOnInit();
        // this.serviceSnackBar.openSnackBar(error, "Ok");
        this.serviceSnackBar.openSnackBar("❌ Connexion à échoué", "Ok");
      });
  }

}
