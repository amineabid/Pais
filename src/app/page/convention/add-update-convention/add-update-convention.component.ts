import { AfterViewInit, Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EMPTY, from } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { DynamicFormComponent } from 'src/app/share/component/componentForms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/share/component/componentForms/field.interface';
import { DataTableService } from 'src/app/share/component/data-table/data-table.service';
import { SidenavService } from 'src/app/share/component/sidebar/sidebar.service';
import { SideBarRightService } from 'src/app/share/component/sidenavright/sidebarright.service';
import { SnackebarService } from 'src/app/share/component/snackbar/snackebar.service';
import { ConventionComponent } from '../convention.component';
import { Convention } from 'src/model/convention';
import { ConventionService } from 'src/controller/convention.service';
import { ListConventionComponent } from '../list-convention/list-convention.component';

@Component({
  selector: 'app-add-update-convention',
  templateUrl: './add-update-convention.component.html',
  styleUrls: ['./add-update-convention.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AddUpdateConventionComponent implements AfterViewInit {
  // @ViewChild(ListConventionComponent) public lscc:ListConventionComponent;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @Input()
  updConv: Convention ;
  conventionForm = this.fb.group({
    cod_CONV: [""],
    lib_CONV: ["", Validators.required],
    usr_CONV: [""],
    action_CONV: [""],
    rsUsr_CONV: [""],
    dateAction_CONV: [""]
  });
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Libéle convention",
      inputType: "text",
      name: "lib_CONV",
      //  value: this.conventionForm.get("lib_CONV").value,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Libéle convention est vide"
        }
        // {
        //   name: "pattern",
        //   validator: Validators.pattern("^[a-zA-Z]+$"),
        //   message: "Accept only text"
        // }
      ]
    },
    {
      type: "input",
      label: "User Convention",
      inputType: "text",
      name: "usr_CONV",
      //  value: this.conventionForm.get("usr_CONV").value,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "User Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid User"
        }
      ]
    },
    {
      type: "input",
      label: "Action Convention",
      inputType: "number",
      name: "action_CONV",
      //  value: this.conventionForm.get("action_CONV").value,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Action Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[0-9]{1}$"
          ),
          message: "il faut contient 0 -> 9"
        }
      ]
    },
    {
      type: "input",
      label: "Action Convention",
      inputType: "number",
      name: "action_CONV",
      //  value: this.conventionForm.get("action_CONV").value,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Action Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[0-9]{1}$"
          ),
          message: "il faut contient 0 -> 9"
        }
      ]
    },
    {
      type: "input",
      label: "Rs User Convention",
      inputType: "text",
      name: "rsUsr_CONV",
      value: "",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Rs User Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            // "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
            "[a-zA-Z]{1}$"
          ),
          message: "il faut contient un lettre alphabetique"
        }
      ]
    },
    {
      type: "input",
      label: "Date Creation",
      inputType: "datetime-local",
      name: "dateAction_CONV",
      value: "19/11/2018 - 09:32:55",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Time creation est vide"
        }
      ]
    },
    {
      type: "button",
      label: "Save",
      // disabled: this.conventionForm.invalid
    }
  ];
  constructor(private fb: FormBuilder,
            public conventionService: ConventionService,
            //  private parent: ConventionComponent,
              private snackService: SnackebarService,
                private serviceSideBarRighht: SideBarRightService,
                private serviceDataTable:DataTableService,
                
          ) {}

  public showdata: boolean=false;
  async ngAfterViewInit(): Promise<void> {
    
    
    
  }
  columnsToDisplay: string[] ;
  async ngOnInit(): Promise<void> {
    this.showdata = false;
    if (this.serviceDataTable.sendDataToUpdate != null) {
      // const promise = (await this.conventionService.getConvention(Number(this.serviceDataTable.sendDataToUpdate.cod_CONV))).toPromise();
      const promise = this.conventionService.get(Number(this.serviceDataTable.sendDataToUpdate.cod_CONV));
      
      promise.then((conventions) => {
        //console.log("Promise resolved with: " + JSON.stringify(data));
        this.conventionForm.patchValue(this.serviceDataTable.sendDataToUpdate);

        this.regConfig.forEach(elements => {
          for (let element in conventions) {
            if (elements.name == element) {
              if (elements.inputType =="datetime-local"){
                let date :string = conventions[element].toString();
                for (let index = 0; index < date.length; index++) {
                  if (date[index + 1] == " " && date[index] == "-" && date[index - 1] == " " ){
                    date = date.substring(0, index-1) + "T" + date.substring(index + 1+1);
                  }
                }
                let day = date.substring(0, date.indexOf("/", 0));
                let month = date.substring(date.indexOf("/", 0) + 1, date.indexOf("/", date.indexOf("/", 0) + 1));
                let year = date.substring(date.indexOf("/", date.indexOf("/", date.indexOf("/", 0) + 1)) + 1, date.indexOf("T", 0));
                elements.value = moment([Number(year), Number(month), Number(day)]).format("YYYY-MM-DD");
                console.log(moment([Number(year), Number(month), Number(day)]).format("YYYY-MM-DDTHH:mm"));
              
              }
              // else if (elements.inputType == "time"){
              //   let date: string = conventions[element].toString();
              //   for (let index = 0; index < date.length; index++) {
              //     if (date[index + 1] == " " && date[index] == "-" && date[index - 1] == " ") {
              //       date = date.substring(0, index - 1) + "T" + date.substring(index + 1 + 1);
              //     }
              //   }
              //   let day = date.substring(0, date.indexOf("/", 0));
              //   let month = date.substring(date.indexOf("/", 0) + 1, date.indexOf("/", date.indexOf("/", 0) + 1));
              //   let year = date.substring(date.indexOf("/", date.indexOf("/", date.indexOf("/", 0) + 1)) + 1, date.indexOf("T", 0));

              //   let time = date.substring(date.indexOf("T", 0), date.length);
              //   console.log(new Date(year + "-" + month + "-" + day +time) );
              //   console.log(new Timestamp(time,1));
              //   console.log(moment(year + "-" + month + "-" + day + time).format("HH:mm"));
              //   elements.value = moment(year + "-" + month + "-" + day + time).format("HH:mm");
              // }else{
              //   elements.value = conventions[element];
              // }
              
            }
          }
        });
        this.showdata = true;
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.showdata = true;
      // this.conventionForm.patchValue(this.serviceDataTable.columnsToDisplay);
      // this.regConfig
    }
  }


  get lib_CONV(){
    return this.conventionForm.get("lib_CONV");
  }
  public get cod_conv(){
    return this.conventionForm.get("cod_CONV");
  }
  async onSubmit() {
    if (this.serviceDataTable.sendDataToUpdate != null) {
      (await this.conventionService.updateConvention(this.conventionForm.get("cod_CONV").value, this.conventionForm.value)).subscribe(
        response => {
          // this.serviceDataTable.dataTableComponent.ngOnInit();
          this.serviceSideBarRighht.sidebarRightComponent.sideNav.close();
          this.snackService.openSnackBar("✅ Convention modifée", "OK");
          this.serviceDataTable.sendDataToUpdate = null;
          this.conventionService.getAll().then((conventions: any[]) => {
            this.serviceDataTable.dataTableComponent.dataSource.data = conventions;
          });
        },
        error => {
          console.log(error);
          this.serviceSideBarRighht.sidebarRightComponent.sideNav.close();
          this.snackService.openSnackBar("❌ Connexion à échoué", "Ok");
          this.serviceDataTable.sendDataToUpdate = null;
        });
    }else{
      (await this.conventionService.createConvention(this.conventionForm.value)).subscribe(
        response => {
          console.log(response);
          
          // this.parent.sidenav.close();
          
          // this.serviceDataTable.dataTableComponent.ngOnInit();
          this.serviceSideBarRighht.sidebarRightComponent.sideNav.close();
          this.serviceSideBarRighht.sidebarRightComponent.modifierCompoent.clear();
          this.snackService.openSnackBar("✅ Convention Crée","OK");
          // this.serviceDataTable.dataTableComponent.ngOnInit();
          this.serviceDataTable.sendDataToUpdate = null;
          this.conventionService.getAll().then((conventions: any[]) => {
            this.serviceDataTable.dataTableComponent.dataSource.data = conventions;
          });
        },
        error => {
          console.log(error);
          this.serviceSideBarRighht.sidebarRightComponent.sideNav.close();
          this.serviceSideBarRighht.sidebarRightComponent.modifierCompoent.clear();
          this.snackService.openSnackBar("❌ Connexion à échoué", "Ok");
          this.serviceDataTable.sendDataToUpdate =null;
        });
    }
    // console.log(this.conventionForm);
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }



  submit(value: any) {
    // console.log(value);
    if (this.serviceDataTable.sendDataToUpdate != null) {
      this.conventionForm = this.fb.group({
        cod_CONV: [this.serviceDataTable.sendDataToUpdate.cod_CONV],
        lib_CONV: [value.lib_CONV],
        usr_CONV: [value.usr_CONV],
        action_CONV: [value.action_CONV],
        rsUsr_CONV: [value.rsUsr_CONV],
        dateAction_CONV: [moment(value.dateAction_CONV).format('DD/MM/YYYY') + " - " + value.time]
      });
    }
    else{
      this.conventionForm = this.fb.group({
        cod_CONV: [""],
        lib_CONV: [value.lib_CONV],
        usr_CONV: [value.usr_CONV],
        action_CONV: [value.action_CONV],
        rsUsr_CONV: [value.rsUsr_CONV],
        dateAction_CONV: [moment(value.dateAction_CONV).format('DD/MM/YYYY') + " - " + value.time]
      });
    }
     this.onSubmit()

   }

}




    //delete listcolumn[0];
    // let new_list: string[] = listcolumn.pop(1);
    // console.log(new_list)
    // listcolumn.pop();









// this.conventionForm.patchValue(this.serviceDataTable.sendDataToUpdate);
        // // console.log(conventions);

        // this.regConfig.forEach(elements => {
        //   for (let element in conventions) {
        //     // let value = conventions[element];
        //     // console.log(element +" : "+value);
        //     // Use `key` and `value`
        //     if (elements.name == element) {
        //       elements.value = conventions[element];
        //       console.log(elements.value)
        //     }
        //   }
        // });
//methode regConfig

          // this.regConfig= [
          //   {
          //     type: "input",
          //     label: "Libéle convention",
          //     inputType: "text",
          //     name: "lib_CONV",
          //     value: this.conventionForm.get("lib_CONV").value,
          //     validations: [
          //       {
          //         name: "required",
          //         validator: Validators.required,
          //         message: "Libéle convention est vide"
          //       }
          //       // {
          //       //   name: "pattern",
          //       //   validator: Validators.pattern("^[a-zA-Z]+$"),
          //       //   message: "Accept only text"
          //       // }
          //     ]
          //   },
          //   {
          //     type: "input",
          //     label: "User Convention",
          //     inputType: "text",
          //     name: "usr_CONV",
          //     value: this.conventionForm.get("usr_CONV").value,
          //     validations: [
          //       {
          //         name: "required",
          //         validator: Validators.required,
          //         message: "User Required"
          //       },
          //       {
          //         name: "pattern",
          //         validator: Validators.pattern(
          //           "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          //         ),
          //         message: "Invalid User"
          //       }
          //     ]
          //   },
          //   {
          //     type: "input",
          //     label: "Action Convention",
          //     inputType: "number",
          //     name: "action_CONV",
          //     value: this.conventionForm.get("action_CONV").value,
          //     validations: [
          //       {
          //         name: "required",
          //         validator: Validators.required,
          //         message: "Action Required"
          //       },
          //       {
          //         name: "pattern",
          //         validator: Validators.pattern(
          //           "^[0-9]{1}$"
          //         ),
          //         message: "il faut contient 0 -> 9"
          //       }
          //     ]
          //   },
          //   {
          //     type: "input",
          //     label: "Rs User Convention",
          //     inputType: "text",
          //     name: "rsUsr_CONV",
          //     value: this.conventionForm.get("rsUsr_CONV").value,
          //     validations: [
          //       {
          //         name: "required",
          //         validator: Validators.required,
          //         message: "Rs User Required"
          //       },
          //       {
          //         name: "pattern",
          //         validator: Validators.pattern(
          //           // "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          //           "[a-zA-Z]{1}$"
          //         ),
          //         message: "il faut contient un lettre alphabetique"
          //       }
          //     ]
          //   },
          //   {
          //     type: "date",
          //     label: "Date Creation",
          //     name: "dateAction_CONV",
          //     value: moment(this.conventionForm.get("dateAction_CONV").value).format('DD/MM/YYYY'),
          //     validations: [
          //       {
          //         name: "required",
          //         validator: Validators.required,
          //         message: "Date Creation est vide"
          //       }
          //     ]
          //   },
          //   {
          //     type: "input",
          //     label: "Time Creation",
          //     inputType: "time",
          //     name: "time",
          //     value: moment(this.conventionForm.get("dateAction_CONV").value).format('h:mm:ss'),
          //     validations: [
          //       {
          //         name: "required",
          //         validator: Validators.required,
          //         message: "Time creation est vide"
          //       }
          //     ]
          //   },
          //   {
          //     type: "button",
          //     label: "Save",
          //     // disabled: this.conventionForm.invalid
          //   }
          // ];

//Fin methode






        // console.log(conventions);


            // let date = moment(value.dateAction_CONV).format('DD/MM/YYYY');
    // let time = moment(value.dateAction_CONV).format('h:mm:ss');
    // console.log(moment(aa + " " + value.time).format('DD MM YYYY, h:mm:ss a'))
    // console.log(date + " - " + value.time)