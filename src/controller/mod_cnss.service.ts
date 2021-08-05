

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Config } from 'src/model/config';
import { MOD_CNSS } from 'src/model/MOD_CNSS';


@Injectable({
  providedIn: 'root'
})
export class MOD_CNSSService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });


  private baseUrl = Config.getMOD_CNSS;
  constructor(public http: HttpClient) {
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
    return this.http.delete<MOD_CNSS>(`${this.baseUrl}` + '/delete', options ).toPromise();
  }

  public getAll() {
    return this.http.post<MOD_CNSS[]>(`${this.baseUrl}` + '/list', { headers: this.header }).toPromise();
  }
  private static fb: FormBuilder;
  static form: FormGroup;
  initialForm(paramfb: FormBuilder) {
    MOD_CNSSService.fb = paramfb;
    MOD_CNSSService.form = MOD_CNSSService.fb.group(
      {
        Entete: MOD_CNSSService.fb.group({}),
        Enligne:
        MOD_CNSSService.fb.group({
            lignes: MOD_CNSSService.fb.array([])
          })
      }
    )
    MOD_CNSSService.fileds().forEach(element => {
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
      (MOD_CNSSService.form.get("Entete") as FormGroup).setControl(element.name, control)

    });
    return MOD_CNSSService.form;
  }
  static fileds() {
    let fildesConfig = [];
    interface IMyTable extends MOD_CNSS { };
    type MyTablePropsArray = Array<keyof IMyTable>;
    const propsArray: MyTablePropsArray = Object.keys(new MOD_CNSS()) as MyTablePropsArray;


    propsArray.forEach(element => {

      if (element == "cod_CNSS") {
        fildesConfig.push(
          {
            type: "input",
            label: "Code",
            inputType: "number",
            name: element,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              },
            ],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit:true
          }
        );
      }
      if (element == "lib_CNSS") {
        fildesConfig.push(
          {
            type: "input",
            label: "Designation",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit:true
          }
        );
      }
      if (element == "typ_CNSS") {
        fildesConfig.push(
          {
            type: "input",
            label: "Type CNSS",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit:true
          }
        );
      }
      if (element == "taux_CNSS") {
        fildesConfig.push(
          {
            type: "input",
            label: "CNSS %",
            inputType: "number",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit:true
          }
        );
      }
      if (element == "txpat_CNSS") {
        fildesConfig.push(
          {
            type: "input",
            label: "Taux patronal",
            inputType: "number",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit:true
          }
        );
      }
      if (element == "karama_cnss") {
        fildesConfig.push(
          {
            type: "input",
            label: "Karama",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit:true
          }
        );
      }
    });
    return fildesConfig;
  }
}
