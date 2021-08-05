import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs'; 
import { Convention } from './../model/convention';
// import 'rxjs/add/operator/map';
import { Config } from 'src/model/config'
import { AbstractControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ConventionService implements OnInit{

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });
  // 
  private ip: string =null ;
  private url:Config = Config.serverPath;
  private baseUrl = Config.getConvention;
  public convention:Convention;
  public  static listCod_CONV: any;
  public static listConv: any;
  constructor(public http: HttpClient) {
    // this.ip = this.http.get("http://api.ipify.org/?format=json");
    this.getAll().then((conventions: Convention[]) => {

      ConventionService.listCod_CONV = conventions.map(x => x.cod_CONV);
      ConventionService.listConv = conventions;
    });
    
   }

   async getConvention(id: number): Promise<Observable<any>> {
     return (await this.http.post<any>(`${this.baseUrl}` + '/getone/' + `${id}`, { headers: this.header }));
    
  }
  ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  }
  async createConvention(conv: any): Promise<Observable<any>> {
    return await this.http.post<any>(`${this.baseUrl}` + '', conv, { headers: this.header });
  }

  async updateConvention(id: number, value: any): Promise<Observable<any>> {
    let params = new HttpParams()
      .set('username', "")
      .set('password', "");
    return await this.http.post<any>(`${this.baseUrl}` + '/' + `${id}`, value, { headers: this.header });
  }

  deleteConvention(id: number): Observable<Convention> {
    // let value: any;
    // this.http.request('delete', `${this.baseUrl}` + '/convention/delete',  { body: value, responseType: 'json', headers: this.header });
    return this.http.delete<Convention>(`${this.baseUrl}` + '/' + `${id}`, { responseType: 'json', headers: this.header });
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
    return this.http.delete<Convention>(`${this.baseUrl}` + '/delete', options ).toPromise();
  }
  public getAll() {
     return this.http.get<Convention[]>(`${this.baseUrl}` + '/list', { headers: this.header }).toPromise();
  }


  static filedConvention(){
    let fildesConfig=[];
    interface IMyTable extends Convention { };
    type MyTablePropsArray = Array<keyof IMyTable>;
    const propsArray: MyTablePropsArray = Object.keys(new Convention()) as MyTablePropsArray;
    propsArray.forEach(element => {
      if (element == "cod_CONV") {
        fildesConfig.push(
          {
            type: "input",
            label: "Code",
            inputType: "number",
            name: element,
            validations: [
              // {
              //   name: "NotTaken",
              //   validator: ConventionService.validateNotTaken(),
              //   message: "Modification"
              // },
              // {
              //   name: "Taken",
              //   validator: ConventionService.validateTaken(),
              //   message: "Ajouter"
              // },
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              }
            ],
            column_show: true,
            column_edit: true,
            showpopover: false,
            thisForignKey: false,
            thisPrimaryKey: true,
            thisIncriment: true,
            getLbythis:true
          }
        );
      }
      if (element == "lib_CONV") {
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
              }
            ],
            column_show: true,
            column_edit: true,
            showpopover: false,
            thisChangeif: ["cod_CONV"],
            thisForignKey: false,
            thisPrimaryKey: false,
            getconventionbythis: false
          }
        );
      }

    });
    return fildesConfig;
  }
  //This goes into service
  static validateNotTaken() {


    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let v = ConventionService.listCod_CONV.find(x => String(x) === String(control.value));

      if (v != undefined) {
        return { NotTaken: true }
      } else {
        return null;
      }

    };
  }
  //This goes into service
  static validateTaken() {


    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let v = ConventionService.listCod_CONV.find(x => String(x) === String(control.value));

      if (v == undefined && String(control.value) != "") {
        return { Taken: true }
      } else {
        return null;
      }

    };
  }

}
