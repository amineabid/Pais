

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Config } from 'src/model/config';
import { MOD_Calcule } from 'src/model/MOD_Calcule';


@Injectable({
  providedIn: 'root'
})
export class MOD_CalculeService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });

  static listmodcalule: MOD_Calcule[]=[];
  private baseUrl = Config.getMOD_Calcule;
  constructor(public http: HttpClient) {
    this.getAll().then(x => {
      MOD_CalculeService.listmodcalule = x;
      
    });
  }
  public get(id: number){
    return (this.http.post<any>(`${this.baseUrl}` + '/getone/' + `${id}`, { headers: this.header })).toPromise();

  }
  public createUpdate(conv: any) {
    return this.http.post<any>(`${this.baseUrl}` + '/createUpdate', conv, { headers: this.header }).toPromise();
  }
  public delete(value: any){
    let options = {
      headers: this.header,
      body: value,
    };
    return this.http.delete<MOD_Calcule>(`${this.baseUrl}` + '/delete', options ).toPromise();
  }

  public getAll() {
    return this.http.post<MOD_Calcule[]>(`${this.baseUrl}` + '/list', { headers: this.header }).toPromise();
  }
  private static fb: FormBuilder;
  static form: FormGroup;
  initialForm(paramfb: FormBuilder) {
    MOD_CalculeService.fb = paramfb;
    MOD_CalculeService.form = MOD_CalculeService.fb.group(
      {
        Entete: MOD_CalculeService.fb.group({}),
        Enligne:
          MOD_CalculeService.fb.group({
            lignes: MOD_CalculeService.fb.array([])
          })
      }
    )
    MOD_CalculeService.fileds().forEach(element => {
      const validList = [];
      if (element.validations.length > 0) {
        element.validations.forEach(valid => {
          validList.push(valid.validator);
        });
        //return Validators.compose(validList);
      }

      const control = new FormControl(

        { value: element.initialvalue != undefined ? element.initialvalue : "", disabled: !element.column_edit },
        validList,

      );
      (MOD_CalculeService.form.get("Entete") as FormGroup).setControl(element.name, control)

    });
    return MOD_CalculeService.form;
  }
  static fileds() {
    let fildesConfig = [];
    interface IMyTable extends MOD_Calcule { };
    type MyTablePropsArray = Array<keyof IMyTable>;
    const propsArray: MyTablePropsArray = Object.keys(new MOD_Calcule()) as MyTablePropsArray;


    propsArray.forEach(element => {

      if (element == "cod_MC") {
        fildesConfig.push(
          {
            type: "input",
            label: "Code",
            inputType: "text",
            name: element,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              },
            ],
            column_show: true,
            showpopover: true,
            value: "",
            column_edit:true
          }
        );
      }
      if (element == "lib_MC") {
        fildesConfig.push(
          {
            type: "input",
            label: "Libellé",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: true,
            value: "",
            column_edit:true
          }
        );
      }
      
    });
    return fildesConfig;
  }
}
