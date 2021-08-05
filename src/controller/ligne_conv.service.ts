import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs'; 
import { Convention } from './../model/convention';
// import 'rxjs/add/operator/map';
import { Config } from '../model/config';
import { Ligne_conv } from '../model/ligne_conv';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IndemniteService } from './indemnite.service';
import { Indemnite } from 'src/model/indemnite';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class Ligne_convService implements OnInit{

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });
  // 
  private ip: string =null ;
  private url:Config = Config.serverPath;
  private baseUrl = Config.getLigne_conv;
  public convention:Convention;
  static listInd: Indemnite[] = [];
  static fildsInd: Indemnite[] = [];
  constructor(public http: HttpClient,private indiemnuiteService:IndemniteService) {
    // this.ip = this.http.get("http://api.ipify.org/?format=json");
    
    this.indiemnuiteService.getIndemniteList().then((indem: Indemnite[]) => {
      Ligne_convService.listInd = indem;
      Ligne_convService.fildsInd = this.indiemnuiteService.filedIndemnite();
    });
    
    // this.getLLC();
    
   }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

}
   async getLigneConvention(id: number): Promise<Observable<any>> {
     return (await this.http.get<any>(`${this.baseUrl}` + '/getOne', { headers: this.header })).toPromise();
    
  }

  async createLigneConvention(conv: any): Promise<Observable<any>> {
    return await this.http.post<any>(`${this.baseUrl}` + '/create', conv, { headers: this.header }).toPromise();
  }

  async updateLigneConvention(value: any, valuedetail: any): Promise<Observable<any>> {
    let params = new HttpParams()
      .set('lcnv', value)
      .set('lconvDetail', valuedetail);
    return await this.http.post<any>(`${this.baseUrl}` + '/update', params, { headers: this.header }).toPromise();
  }

  deleteLigneConvention(value: any): Observable<Ligne_conv> {
    // let value: any;
    return this.http.request<Ligne_conv>('delete', `${this.baseUrl}` + '/delete',  { body: value, responseType: 'json', headers: this.header });
    //return this.http.delete<Convention>(`${this.baseUrl}` + '/convention/' + `${id}`, { responseType: 'json', headers: this.header });
  }

  getLigneConventionList() {
    return this.http.get<any[]>(`${this.baseUrl}` + '', { headers: this.header })
    .pipe(map((albums: Ligne_conv[]) => {
 
      return albums;
    })).toPromise();
    
  }
  // getLLC(){
  //   const promise = new Promise((resolve, reject) => {
  //     const apiURL = this.baseUrl;
  //     this.http
  //       .get<any[]>(apiURL)
  //       .toPromise()
  //       .then((res: any) => {
  //         // Success
  //         // this.data = res.map((res: any) => {
  //         //   return new Post(
  //         //     res.userId,
  //         //     res.id,
  //         //     res.title,
  //         //     res.body
  //         //   );
  //         // });
  //         console.log(res);
          
  //         resolve();
  //       },
  //         err => {
  //           // Error
  //           reject(err);
  //         }
  //       );
  //   });
  //   return promise;
  //   // return fetch('https://www.googleapis.com/books/v1/volumes?q=extreme%20programming')
  //   //   // .then(response => response.status)
  //   //   .then(response => {
  //   //     console.log(response);
  //   //   });
  // }
  getLigneConventionByCOnv(cnv:Convention): Observable<any[]> {
    // fetch('https://www.googleapis.com/books/v1/volumes?q=extreme%20programming').then(response => response.status).then(status => console.log(status)
    
    return this.http.post<any[]>(`${this.baseUrl}` + '/getLConvetionByCOnv', cnv,{ headers: this.header })
    .pipe(map((albums: Ligne_conv[]) => {
 
      return albums;
    }));
  }
  //methode forms
  // createControl() {
  //   const group = this.fb.group({});
  //   Ligne_convService.filedLigneConvention().forEach(field => {
  //     const control = this.fb.control(
  //       field.value,
  //       this.bindValidations(field.validations || [])
  //     );
  //     group.addControl(field.name, control);
  //   });
  //   return group.controls;
  // }
  asFormGroup(album: Ligne_conv): FormGroup {
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
        
        { value: album[element.name], disabled: !element.showpopover},
        validList,
        
      );
      fg.setControl(element.name, control)
    });
    return fg;
  }
  // getAllAsFormArray(): Observable<FormArray> {
  //   return this.getLigneConventionList().pipe(map((albums: Ligne_conv[]) => {
  //     const fgs = albums.map(this.asFormGroup);
  //     return new FormArray(fgs);
  //   }));
  // }
  getLconvByConvAsFormArray(cnv:Convention): Observable<FormArray> {
    return this.getLigneConventionByCOnv(cnv).pipe(map((albums: Ligne_conv[]) => {
      const fgs = albums.map(this.asFormGroup);
      return new FormArray(fgs);
    }));
  }

  //fin methode forms
  getReportLigneConventionList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}` + '/report/pdf', { headers: this.header });
  }
  getReportLien(id1?: number,id2?:number): any {
    if(id1!=undefined && id2!=undefined){
      return `${this.baseUrl}` + '/report/pdf/'+id1+'/'+id2;
    } else if (id1 != undefined && id2==undefined){
      return `${this.baseUrl}` + '/report/pdf/' + id1 ;
    }else{
      return `${this.baseUrl}` + '/report/pdf';
    }
    
  }
  public get(conv:any,id1?: number,id2?:number){
    if(id1!=undefined && id2!=undefined){
      return (this.http.post<any>(`${this.baseUrl}` + '/getone' + `/${id1}`+ `/${id2}`, conv, { headers: this.header })).toPromise();
    } else if (id1 != undefined && id2==undefined){
      return (this.http.post<any>(`${this.baseUrl}` + '/getone' + `/${id1}`, conv, { headers: this.header })).toPromise();
    }else{
      return (this.http.post<any>(`${this.baseUrl}` + '/getone' , conv, { headers: this.header })).toPromise();
    }

  }
  public createUpdate(conv: any) {
    return this.http.post<any>(`${this.baseUrl}` + '/createUpdate', conv, { headers: this.header }).toPromise();
  }  
  public createUpdatelist(conv: any[]) {
    return this.http.post<any>(`${this.baseUrl}` + '/createUpdatelist', conv, { headers: this.header }).toPromise();
  }
  public deletelist(conv: any) {
    return this.http.post<any>(`${this.baseUrl}` + '/deletelist', conv, { headers: this.header }).toPromise();
  }
  public delete(value: any){
    let options = {
      headers: this.header,
      body: value,
    };
    return this.http.delete<Convention>(`${this.baseUrl}` + '/delete', options ).toPromise();
  }
  public getAll() {
     return this.http.post<any[]>(`${this.baseUrl}` + '/list', { headers: this.header }).toPromise();
  }

  public static filedLigneConvention() {
    let fildesConfig = [];
    interface IMyTable extends Ligne_conv { };
    type MyTablePropsArray = Array<keyof IMyTable>;
    const propsArrayy: MyTablePropsArray = Object.keys(new Ligne_conv()) as MyTablePropsArray;
    propsArrayy.forEach(element => {
      // console.log(element)
      if (element == "ind_LCONV") {
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
              // {
              //   name: "NotTaken",
              //   validator: Ligne_convService.validateNotTaken('cod_IND'),
              //   message: "Modification"
              // },
              {
                name: "Taken",
                validator: Ligne_convService.validateTaken('cod_IND'),
                message: "Code n'est pas valid"
              },
              // {
              //   name: "pattern",
              //   validator: Validators.pattern(
              //     "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
              //   ),
              //   message: "Invalid User"
              // }
            ],
            column_show: true,//if this column show in interface graphique
            column_edit:true,//if this column enable in interface graphique
            showpopover: true,//if this column geting value to other table show this popover and set table relation in this popover
            t: true,
            table: [
              {
                displayedColumns: [
                  {
                    editing: false,
                    columns: ['cod_IND', 'lib_IND', 'mt_IND'], //IndemniteService.filedIndemnite().map(x => x.name), 
                    name: Ligne_convService.fildsInd,// IndemniteService.filedIndemnite().map(x=>x.name),
                    show: true
                  },
                ],
                data: Ligne_convService.listInd
              }
            ],
            width: "120px",//this paramater to set width to this column or input
            thisForignKey:true,//if this colum get un autre table
            thisPrimaryKey:false,//if this column primer key
            thisChangeif: ["ind_LCONV", 'cod_IND'],//change value this column if get value to column forignkey to other table
            initialvalue:0 // inistialisation value to this column
          }
        );
      } else if (element == "ligne_LCONV") {
        fildesConfig.push(
          {
            type: "input",
            label: "Ligne",
            inputType: "number",
            name: element,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              }
            ],
            column_show: true,
            column_edit: false,
            showpopover: false,
            t: false,
            width: "100px",
            thisForignKey: false,
            thisPrimaryKey: true,
            thisIncriment: true,
            initialvalue: 1
          }
        );
      } else if (element == "cod_LCONV") {
        fildesConfig.push(
          {
            type: "input",
            label: element,
            inputType: "number",
            name: element,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              },
              
            ],
            column_show: false,
            column_edit: false,
            showpopover: false,
            t: false,
            thisForignKey: true,
            thisPrimaryKey: true,
            columnfiltrer:true,
            thisChangeif: ["cod_CONV"],
            initialvalue: 1
          }
        );
      } else if (element == "mt_LCONV") {
        fildesConfig.push(
          {
            type: "input",
            label: "Montant",
            inputType: "number",
            name: element,
            column_show: true,
            column_edit: true,
            showpopover: true,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              },
              {
                name: "min",
                validator: Validators.min(1),
                message: "il faut > 0"
              },
            ],
            t: false,
            width: "100px",
            thisForignKey: true,
            thisPrimaryKey: false,
            thisChangeif: ["ind_LCONV", 'mt_IND'],
            initialvalue: 0
          }
        );
      } else if (element == "lib_LCONV") {
        fildesConfig.push(
          {
            type: "input",
            label: "Libellé",
            inputType: "text",
            name: element,
            column_show: true,
            column_edit: false,
            showpopover: false,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              }
            ],
            width: "100% !important",
            t: false,
            thisForignKey: true,
            thisPrimaryKey: false,
            thisChangeif: ["ind_LCONV", 'lib_IND'],
            initialvalue: ""
          }
        );

      }
    })
    return fildesConfig;
  }

  //This goes into service
  static validateNotTaken(any) {


    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let v = Ligne_convService.listInd.find(x => String(x[any]) === String(control.value));

      if (v != undefined) {
        return { NotTaken: true }
      } else {
        return null;
      }

    };
  }
  //This goes into service
  static validateTaken(any) {


    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let v = Ligne_convService.listInd.find(x => String(x[any]) === String(control.value));
      // control.setValue('');
      if (v == undefined && String(control.value) != "") {
        
        return { Taken: true }
      } else {
        
        return null;
      }

    };
  }

}
