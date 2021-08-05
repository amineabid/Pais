import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs'; 

import { Config } from './../../model/config';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Ligne_convService } from '../ligne_conv.service';
import { IndemniteService } from '../indemnite.service';
import { Indemnite } from 'src/model/indemnite';
import { ConventionService } from '../convention.service';
import { PrimConventionComponent } from 'src/app/page/prim-convention/prim-convention.component';
// import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class PrimeConventionService implements OnInit {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });
  // 
  private ip: string =null ;
  private url:Config = Config.serverPath;
  private baseUrl = Config.getPrimeConvention;
  private static  fb: FormBuilder;
  static form: FormGroup;
  static alllistligneconvention;
  static alllistconvention;
  constructor(private ligneService:Ligne_convService,
     private conventionService:ConventionService,
    ) {
    this.conventionService.getAll().then((rep) => {
      PrimeConventionService.alllistconvention = rep;
    });
    this.ligneService.getAll().then((rep) => {
      PrimeConventionService.alllistligneconvention = rep;
    })
   }
  ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.
     
   }



  static initialForm(paramfb:FormBuilder){
    PrimeConventionService.fb = paramfb;
    PrimeConventionService.form = PrimeConventionService.fb.group(
      {
        Entete: PrimeConventionService.fb.group({}),
        Enligne:
          PrimeConventionService.fb.group({
            lignes: PrimeConventionService.fb.array([])
          })
      }
    )
    ConventionService.filedConvention().forEach(element => {
      const validList = [];
      if (element.validations.length > 0) {
        element.validations.forEach(valid => {
          validList.push(valid.validator);
        });
        //return Validators.compose(validList);
      }
      const control = new FormControl(

        { value: "", disabled: !element.column_edit },
        validList,

      );
      (this.form.get("Entete") as FormGroup).setControl(element.name, control)

    });
    return this.form;
  }
  asFormGroup(lignes: any): FormGroup {
    const fg = new FormGroup({});
    Ligne_convService.filedLigneConvention().forEach(element => {
      const validList = [];
      if (element.validations.length > 0) {
        element.validations.forEach(valid => {
          validList.push(valid.validator);
        });
        //return Validators.compose(validList);
      }
      const control = new FormControl(

        { value: lignes[element.name], disabled: !element.showpopover },
        validList,

      );
      fg.setControl(element.name, control)
    });
    return fg;
  }
  async getligne(conv:any){
    (<FormArray>PrimeConventionService.form.get('Enligne').get('lignes')).controls = [];
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    let valueforignkey=-1;
    let nameforignkey;
    await Ligne_convService.filedLigneConvention().forEach(async colelement => {
      if (colelement.thisChangeif!=undefined) {
        if (colelement.thisChangeif.length ==1){
          valueforignkey = conv[colelement.thisChangeif[0]];
          nameforignkey = colelement.name;
        }
      }
    });
    await (this.ligneService.getAll()
    .then((rep) => {

      const listfiltred = rep.filter(x =>
        String(x[nameforignkey]) === String(valueforignkey)
      );
      listfiltred.forEach(element => {
        let fg = new FormGroup({});
        Ligne_convService.filedLigneConvention().forEach(async colelement => {
          await sleep(400);
          const control = new FormControl();
          const validList = [];
          if (colelement.validations.length > 0) {
            colelement.validations.forEach(valid => {
              validList.push(valid.validator);
            });
          }
          control.setValue(element[colelement.name])


          if (colelement.showpopover == false) {
            control.disable();
          }
          control.setValidators(validList)

          fg.addControl(colelement.name, control);
        });
        (<FormArray>PrimeConventionService.form.get('Enligne').get('lignes')).push(fg);
      });
      
    }))
    return await (PrimeConventionService.form as FormGroup);
    
    
  }
  static createnewEnLigne(){
    if(this.form.get('Entete').valid)
    {
      let drow = (this.form.get('Enligne').get('lignes')  as FormArray).getRawValue();
      if (drow.length >0){
        drow = drow[drow.length - 1];
        let fg = new FormGroup({});
        //if list found formgroup
        Ligne_convService.filedLigneConvention().forEach(element => {

          const control = new FormControl();
          const validList = [];
          if (element.validations.length > 0) {
            element.validations.forEach(valid => {
              validList.push(valid.validator);
            });
          }
          control.setValue(element.initialvalue)
          if (element.thisPrimaryKey == true && element.thisForignKey == true) {
            control.setValue(this.form.get('Entete').get(element.thisChangeif[0]).value)
          }

          if (element.thisIncriment != undefined){
            control.setValue(drow[element.name] + 1)
          }

          if (element.showpopover == false) {
            control.disable();
          }
          control.setValidators(validList)

          fg.addControl(element.name, control);
        });
        (<FormArray>this.form.get('Enligne').get('lignes')).push(fg);
      } else if (drow.length == 0){
        //if list not found formgroup
        let fg = new FormGroup({});
        Ligne_convService.filedLigneConvention().forEach(element => {
          const control = new FormControl();
          const validList = [];
          if (element.validations.length > 0) {
            element.validations.forEach(valid => {
              validList.push(valid.validator);
            });
          }
          // if (element.thisPrimaryKey == true && element.thisForignKey == false) {
          //   if (element.thisIncriment!=undefined){
          //     control.setValue(element.initialvalue)
          //   }
          //   // control.setValue( 1)
          // } else if (element.thisPrimaryKey == false && element.thisForignKey == true) {
          //   control.setValue('')
          // }
          // if (element.showpopover == false) {
          //   control.disable();
          // }
          control.setValue(element.initialvalue)
          if (element.thisPrimaryKey == true && element.thisForignKey == true) {
            control.setValue(this.form.get('Entete').get(element.thisChangeif[0]).value)
          }

          if (element.thisIncriment != undefined) {
            control.setValue(element.initialvalue)
          }

          if (element.showpopover == false) {
            control.disable();
          }
          control.setValidators(validList)

          fg.addControl(element.name, control);
        });
        (<FormArray>this.form.get('Enligne').get('lignes')).push(fg);
      }
    }else{
      (<FormArray>this.form.get('Enligne').get('lignes')).controls=[];
    }
  }
  static updateEnLigne(column:string,el:FormGroup,valueupdated:any)
  {
    let fg = new FormGroup({});
    let findrow = [];
      Ligne_convService.filedLigneConvention().forEach(element => {
        const control = new FormControl();
        const validList = [];
        if (element.validations.length > 0) {
          element.validations.forEach(valid => {
            validList.push(valid.validator);
          });
        }
        control.setValue(el.get(element.name).value)
        if (element.name == column && element.thisPrimaryKey == false && element.thisForignKey == true){
          if(element.t==true){
            let indim = element.table.data;
            findrow = indim.find(x => x[element.thisChangeif[1]] === valueupdated )
            if (findrow!=undefined){
              control.setValue(findrow[element.thisChangeif[1]])
            }
          }
        }
        if (element.thisChangeif != undefined && findrow.length > 0 && element.thisPrimaryKey == false && element.thisForignKey == true){
          if (findrow != undefined && element.t == false) {
            control.setValue(findrow[element.thisChangeif[1]])
          }
        }

        if (element.showpopover == false) {
          control.disable();
        }
        control.setValidators(validList)
        fg.addControl(element.name, control);
      });
    
    el = fg;
  }

}
