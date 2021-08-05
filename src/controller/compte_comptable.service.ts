

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from 'src/model/config';
import { Compte_comptable } from 'src/model/Compte_comptable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class Compte_comptableService {

  
  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });

  private baseUrl = Config.getCompte_comptable;
  static listCompte_comptable: Compte_comptable[]=[];
  constructor(public http: HttpClient) { 


    this.getAll().then(x => {
      Compte_comptableService.listCompte_comptable = x;
      console.log(x);
      
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
    return this.http.delete<Compte_comptable>(`${this.baseUrl}` + '/delete', options ).toPromise();
  }

  public getAll() {
    
    return this.http.post<Compte_comptable[]>(`${this.baseUrl}` + '/list', { headers: this.header }).toPromise();
  }
  private static fb: FormBuilder;
  static form: FormGroup;
  initialForm(paramfb: FormBuilder) {
    Compte_comptableService.fb = paramfb;
    Compte_comptableService.form = Compte_comptableService.fb.group(
      {
        Entete: Compte_comptableService.fb.group({}),
        Enligne:
          Compte_comptableService.fb.group({
            lignes: Compte_comptableService.fb.array([])
          })
      }
    )
    Compte_comptableService.fileds().forEach(element => {
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
      (Compte_comptableService.form.get("Entete") as FormGroup).setControl(element.name, control)

    });
    return Compte_comptableService.form;
  }
  static fileds() {
    let fildesConfig = [];
    interface IMyTable extends Compte_comptable { };
    type MyTablePropsArray = Array<keyof IMyTable>;
    const propsArray: MyTablePropsArray = Object.keys(new Compte_comptable()) as MyTablePropsArray;


    propsArray.forEach(element => {

      if (element == "compt_compte") {
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
            column_edit: true
          }
        );
      }
      if (element == "lib_compte") {
        fildesConfig.push(
          {
            type: "input",
            label: "Libellé",
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
