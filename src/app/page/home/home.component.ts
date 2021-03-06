import { Component, OnInit } from '@angular/core';
import { Convention } from 'src/model/convention';
import { ConventionService } from 'src/controller/convention.service';
import { Ligne_convService } from 'src/controller/ligne_conv.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ligne_conv } from 'src/model/ligne_conv';
import { FieldConfig } from 'src/app/share/component/componentForms/field.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listconvention: any[];
  columnsToDisplay: string[];
  showTable = false;

  cnvCtrl = new FormControl();
  filteredConvention: Observable<Convention[]>;
  convention:Convention[]=[];
  regConfig: FieldConfig[]=[];
  constructor(public conventionService:ConventionService,
    private ligne_convService: Ligne_convService) { 

    }
  private _filterStates(value: any): Convention[] {
    const filterValue = value.toString().toLowerCase();

    return this.convention.filter(cnv => cnv.cod_CONV.toString().toLowerCase().indexOf(filterValue) === 0);
  }
  hide = true;
  ngOnInit(): void {
    this.conventionService.getAll().then((conventions: any[]) => {
      // this.listconvention = JSON.stringify(conventions);
      
      // console.log(Object.keys(conventions[0]))
      // console.log(conventions)
      // let ls: string[] = ['action'];
      // // console.log(JSON.stringify(Convention.prototype))
      // // console.log(nameofFactory<Convention>())
      // ls = ls.concat(Object.keys(conventions[0]));
      // this.columnsToDisplay = ls;
      // this.columnsToDisplay = Object.keys(conventions[0]);
      this.convention = conventions;
      // this.listconvention = conventions;
      // console.log(this.columnsToDisplay)
      this.filteredConvention = this.cnvCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.convention.slice())
        );
      //  this.showTable=true;
    });
    this.ligne_convService.getAll().then((values: any[]) => {
      // this.listconvention = JSON.stringify(conventions);
      this.listconvention = values;
      // console.log(Object.keys(conventions[0]))
      // console.log(conventions)
      let ls: string[] = ['action'];
      ls = ls.concat(Object.keys(values[0]));
      this.columnsToDisplay = Object.keys(values[0]);
      
      Object.keys(values[0]).forEach(element => {
        
        this.listconvention.forEach(row => {
          if (!this.regConfig.find(e => e.name == element)) {
          switch (typeof row[element]) {
            case "undefined":
              console.log("It is a undefined.");
              break;
            case "object":
              console.log("It is a object.");
              break;
            case "boolean":
              
              console.log("It is a boolean.");
              break;
            case "number":
              this.regConfig.push(
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
                    }
                  ]
                }
              );
              console.log("It is a number.");
              break;
            case "bigint":
              this.regConfig.push(
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
                    }
                  ]
                }
              );
              console.log("It is a bigint.");
              break;
            case "symbol":
              console.log("It is a symbol.");
              break;
            case "string":
              let date: string = row[element].toString();
              for (let index = 0; index < date.length; index++) {
                if (date[index + 1] == " " && date[index] == "-" && date[index - 1] == " ") {
                  date = date.substring(0, index - 1) + "T" + date.substring(index + 1 + 1);
                }
              }
              let day = date.substring(0, date.indexOf("/", 0));
              let month = date.substring(date.indexOf("/", 0) + 1, date.indexOf("/", date.indexOf("/", 0) + 1));
              let year = date.substring(date.indexOf("/", date.indexOf("/", date.indexOf("/", 0) + 1)) + 1, date.indexOf("T", 0));
              if (moment(moment([Number(year), Number(month), Number(day)]).format("YYYY-MM-DD")).isValid()){
                this.verficationString(row[element], "date", element);
              }else{
                this.regConfig.push(
                  {
                    type: "input",
                    label: element,
                    inputType: "text",
                    name: element,
                    validations: [
                      {
                        name: "required",
                        validator: Validators.required,
                        message: "vide"
                      }
                    ]
                  }
                );
              }
              // console.log("It is a string." );
              break;
            default:
              console.log("No such exists!");
              break;
          }
          
            
          }
        });
        

        
        // if (typeof row[element]==undefined){
        //   console.log(typeof row[element])
        // }
      });


      this.showTable=true;
    });
  }

  verficationString(elements:string,type:string,col:string){
    let date: string = elements.toString();
    
    if (type == "date") {
       
        for (let index = 0; index < date.length; index++) {
          if (date[index + 1] == " " && date[index] == "-" && date[index - 1] == " ") {
            date = date.substring(0, index - 1) + "T" + date.substring(index + 1 + 1);
          }
        }
        let day = date.substring(0, date.indexOf("/", 0));
        let month = date.substring(date.indexOf("/", 0) + 1, date.indexOf("/", date.indexOf("/", 0) + 1));
        let year = date.substring(date.indexOf("/", date.indexOf("/", date.indexOf("/", 0) + 1)) + 1, date.indexOf("T", 0));
        // elements = moment([Number(year), Number(month), Number(day)]).format("YYYY-MM-DD");
        this.regConfig.push(
          {
            type: "date",
            label: col,
            inputType: "date",
            name: col,
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "vide"
              }
            ]
          }
        );
         let time = date.substring(date.indexOf("T", 0), date.length);
        //  elements = moment(year + "-" + month + "-" + day + time).format("HH:mm");
          this.regConfig.push(
            {
              type: "time",
              label: col,
              inputType: "time",
              name: col,
              validations: [
                {
                  name: "required",
                  validator: Validators.required,
                  message: "vide"
                }
              ]
            }
          );
       } else {
         elements = elements;
       }
       return elements;
   }

}
export const nameofFactory = <T>() => (name: keyof T) => name;