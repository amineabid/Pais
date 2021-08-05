import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { IndemniteRoutingModule } from 'src/app/page/indemnite/indemnite-routing.module';
import { Compte_comptable } from 'src/model/Compte_comptable';
import { Config } from 'src/model/config';
import { Indemnite } from 'src/model/indemnite';
import { MOD_Calcule } from 'src/model/MOD_Calcule';
import { MOD_CNSS } from 'src/model/MOD_CNSS';
import { Compte_comptableService } from './Compte_comptable.service';
import { MOD_CalculeService } from './mod_calcule.service';
import { MOD_CNSSService } from './mod_cnss.service';

@Injectable({
  providedIn: 'root'
})
export class IndemniteService implements OnInit{

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });


  private baseUrl = Config.getIndemite;
  public indemnite: Indemnite;
  public static listIndm;
  static listmodcnss: MOD_CNSS[]=[];
  static listmodcalule: MOD_Calcule[]=[];
  static listcomptecomp: Compte_comptable[]=[];
  
 
  constructor(public http: HttpClient,
     public compte_comptableS: Compte_comptableService,
  public mod_caluceS: MOD_CalculeService,
  public mod_cnssS: MOD_CNSSService
    ) {
      
    this.getAll().then(x => {
      IndemniteService.listIndm = x;
    })
    
    
    this.compte_comptableS.getAll().then(x => {
      IndemniteService.listcomptecomp = x;
    });
    this.mod_caluceS.getAll().then(x => {
      IndemniteService.listmodcalule = x;
    });
    this.mod_cnssS.getAll().then(x => {
      IndemniteService.listmodcnss = x;
    });
  }
   ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
    //  this.mod_caluceS.getAll().then(res => {
    //    IndemniteService.listmodcalule = res;
    //  });
     

  }
  private static fb: FormBuilder;
  static form: FormGroup;
  initialForm(paramfb: FormBuilder) {
    IndemniteService.fb = paramfb;
    IndemniteService.form = IndemniteService.fb.group(
      {
        Entete: IndemniteService.fb.group({}),
        Enligne:
          IndemniteService.fb.group({
            lignes: IndemniteService.fb.array([])
          })
      }
    )
    this.filedIndemnite().forEach(element => {
      const validList = [];
      if (element.validations.length > 0) {
        element.validations.forEach(valid => {
          validList.push(valid.validator);
        });
      }
      
      const control = new FormControl(

        { value: element.initialvalue != undefined ? element.initialvalue:"", disabled: !element.column_edit },
        validList,

      );
      (IndemniteService.form.get("Entete") as FormGroup).setControl(element.name, control)
      
    });
    return IndemniteService.form;
  }

  getIndemniteList() {
    return this.http.post<Indemnite[]>(`${this.baseUrl}` + '/list', { headers: this.header }).toPromise();
  }
  get(id: number) {
    return (this.http.post<any>(`${this.baseUrl}` + '/getone/' + `${id}`, { headers: this.header })).toPromise();

  }
  createUpdate(conv: any) {
    return this.http.post<any>(`${this.baseUrl}` + '/createUpdate', conv, { headers: this.header }).toPromise();
  }
  delete(value: any) {
    let options = {
      headers: this.header,
      body: value,
    };
    return this.http.delete<any>(`${this.baseUrl}` + '/delete', options).toPromise();
  }

  getAll() {
    return this.http.post<any[]>(`${this.baseUrl}` + '/list', { headers: this.header }).toPromise();
  }

  filedIndemnite() {

    let fildesConfig = [];
    interface IMyTable extends Indemnite { };
    type MyTablePropsArray = Array<keyof IMyTable>;
    const propsArray: MyTablePropsArray = Object.keys(new Indemnite()) as MyTablePropsArray;
    
    
    propsArray.forEach(element => {
      
      if (element == "cod_IND") {
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
            showpopover: false,
            value: "",
            t: true,
            table: [
              {
                displayedColumns: [
                  {
                    columns: ['cod_IND', 'lib_IND', 'mt_IND'], //IndemniteService.filedIndemnite().map(x => x.name), 
                    name: [],// IndemniteService.filedIndemnite().map(x=>x.name),
                  },
                ],
                data: []
              }
            ],
            column_edit: true,
            
          }
        );
      }
      if (element == "lib_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Libellé",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "abrev_ind") {
        fildesConfig.push(
          {
            type: "input",
            label: "Abreviation",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      
      
      if (element == "cal_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Code Mode Calcul",
            inputType: "text",
            name: element,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              },
              {
                name: "Taken",
                validator: this.validateMOD_CalculeTaken('MOD_Calcule','cod_MC'),
                message: "Cette Code n'est pas \r code MOD_Calcule"
              },
            ],
            column_show: true,
            showpopover: false,
            value:"",
            t: true,
            table: [
              {
                displayedColumns: [
                  {
                    columns: ['cod_MC', 'lib_MC'], //IndemniteService.filedIndemnite().map(x => x.name), 
                    name: MOD_CalculeService.fileds(),//.map(x => x.name) IndemniteService.filedIndemnite().map(x=>x.name),
                  },
                ],
                data: IndemniteService.listmodcalule
              }
            ],
            column_edit: true,
            initialvalue: 2,
          }
        );
      }
      
      if (element == "codcn_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Code Mode Cnss",
            inputType: "text",
            name: element,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              },
              {
                name: "Taken",
                validator: IndemniteService.validateMOD_CNSSSTaken('MOD_CNSSS', 'cod_CNSS'),
                message: "Cette Code n'est pas \r code MOD_CNSSS"
              },
            ],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: true,
            table: [
              {
                displayedColumns: [
                  {
                    columns: ['cod_CNSS', 'lib_CNSS'], //IndemniteService.filedIndemnite().map(x => x.name), 
                    name: MOD_CNSSService.fileds(),// .map(x => x.name) IndemniteService.filedIndemnite().map(x=>x.name),
                  },
                ],
                data: IndemniteService.listmodcnss
              }
            ],
            initialvalue: 1,
          }
        );
      }
      
      if (element == "cptcpt_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Code Compte Comptable",
            inputType: "number",
            name: element,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              },
              {
                name: "Taken",
                validator: IndemniteService.validateCompte_comptableTaken('Compte_comptable', 'compt_compte'),
                message: "Cette Code n'est pas \r code Compte_comptable"
              },
            ],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: true,
            table: [
              {
                displayedColumns: [
                  {
                    columns: ['compt_compte', 'lib_compte'], //IndemniteService.filedIndemnite().map(x => x.name), 
                    name: Compte_comptableService.fileds(),// IndemniteService.filedIndemnite().map(x=>x.name),
                  },
                ],
                data: IndemniteService.listcomptecomp
              }
            ],
            initialvalue: 1,
          }
        );
      }
      if (element == "dateAction_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "",
            inputType: "text",
            name: element,
            validations: [],
            column_show: false,
            showpopover: false,
            value:"",
            column_edit: false,
            t: false
          }
        );
      }
      
      if (element == "mt_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Montant",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "mt_INDAV") {
        fildesConfig.push(
          {
            type: "input",
            label: "",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "mtbase_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Base Ind",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "plaf_ind") {
        fildesConfig.push(
          {
            type: "input",
            label: "palfond Ind",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "pour_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Pourcentage %",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true
          }
        );
      }
      
      if (element == "rsusr_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      
      if (element == "ste_ind") {
        fildesConfig.push(
          {
            type: "input",
            label: "",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "txcnss_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Taux Cnss",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "txpatcnss_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Taux Patronal",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "usr_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "",
            inputType: "text",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value:"",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "cong_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Congé",
            inputType: "checkbox",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "cotisable_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Cotisation",
            inputType: "checkbox",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "sens_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Sence",
            inputType: "checkbox",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "rappel_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Rappel",
            inputType: "checkbox",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit: true,//if this column enable in interface graphique
            t: false,
            width: "120px",//this paramater to set width to this column or input
            thisForignKey: true,//if this colum get un autre table
            thisPrimaryKey: false,//if this column primer key
            //thisChangeif: ["ind_LCONV", 'cod_IND'],//change value this column if get value to column forignkey to other table
            initialvalue: 0 // inistialisation value to this column
          }
        );
      }
      if (element == "pre_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Conventielle",
            inputType: "checkbox",
            name: element,
            validations: [],
            column_show: true,
            showpopover: false,
            value: "",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "action_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Action",
            inputType: "text",
            name: element,
            validations: [],
            column_show: false,
            showpopover: false,
            value: "",
            column_edit: true,
            t: false
          }
        );
      }
      if (element == "avten_IND") {
        fildesConfig.push(
          {
            type: "input",
            label: "Impot",
            inputType: "checkbox",
            name: element,
            validations: [],
            column_show: false,
            showpopover: false,
            value: "",
            column_edit: true,
            t: false

          }
        );
      }
    });
    return fildesConfig;
  }
  public getlistcptcpt() {
    this.compte_comptableS.getAll().then(res => {
      return res;
    });
  }
  public getlistmodcnss() {

    this.mod_cnssS.getAll().then(res => {
      return res;
    });
  }
  public  getlistmodcal() {
    this.mod_caluceS.getAll().then(res => {
      IndemniteService.listmodcalule= res;
      
    })
  }
  validateMOD_CalculeTaken(list,any) {
    try {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const v = IndemniteService.listmodcalule.find(x => String(x[any]) === String(control.value));
        if (v == undefined && String(control.value) != "") {
          return { Taken: true }
        } else {
          return null;
        }
      };

    }
    catch (error) {
      console.error(error);
    }
    
  }
  
  
  static validateMOD_CNSSSTaken(list,any) {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        let v = IndemniteService.listmodcnss.find(x => String(x[any]) === String(control.value));
        
        if (v == undefined && String(control.value) != "") {
          return { Taken: true }
        } else {
          return null;
        }
      };
  }
  static validateCompte_comptableTaken(list,any) {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        let v = IndemniteService.listcomptecomp.find(x => String(x[any]) === String(control.value));
        
        if (v == undefined && String(control.value) != "") {
          return { Taken: true }
        } else {
          return null;
        }
      };
  }
}
