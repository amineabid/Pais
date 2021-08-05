import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppLoaderService } from 'src/app/share/component/app-loader/app-loader.service';
import { SnackebarService } from 'src/app/share/component/snackbar/snackebar.service';
import { MOD_CNSSService } from 'src/controller/mod_cnss.service';

@Component({
  selector: 'app-mod-cnss',
  templateUrl: './mod-cnss.component.html',
  styleUrls: ['./mod-cnss.component.scss']
})
export class ModCnssComponent implements OnInit {
  isCollapsedMOD_CNSSS=true;
  dataFiltredMOD_CNSSS;
  private _form: FormGroup;
  public get form(): FormGroup {
    return this._form;
  }
  public set form(value: FormGroup) {
    this._form = value;
  }
  activeajouter=true;
  activemodifer=false;
  fildesConfig;
  listMOD_CNSSS=[];
  showTablePopoverSimple=false;
  constructor(
    private sophiaLoader: AppLoaderService,
    private _formBuilder:FormBuilder,
      private mod_cnssS:MOD_CNSSService,
        private snackService: SnackebarService,
        private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.mod_cnssS.initialForm(this._formBuilder);
    this.fildesConfig = MOD_CNSSService.fileds();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.mod_cnssS.getAll().then(x => {
      this.listMOD_CNSSS = x;
      this.showTablePopoverSimple = true;
    });
  }
  ngDoCheck(event): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.fildesConfig.forEach(element => {
      this.form.get("Entete").get(element.name).setValue(this.form.get("Entete").get(element.name).value);
    });
    const Elemevent = this.listMOD_CNSSS.find(x => String(x['cod_CNSS']) == String(this.form.get('Entete').get('cod_CNSS').value));
    
    if (Elemevent != undefined) {
      this.activeajouter = false;
      this.activemodifer = true;
    } else if (Elemevent == undefined) {
      this.activeajouter = true;
      this.activemodifer = false;
    }
    this.cdr.detectChanges();
  }
  OnGetElementMOD_CNSSS(event){
    this.fildesConfig.forEach(element => {
      if (Object.keys(event).find(x => x == element.name)!=undefined){
        if (typeof event[element.name] == 'string') {
          event[element.name] = event[element.name].trim();
        }
        this.form.get('Entete').get(element.name).setValue(event[element.name]);
      }
    });
  }
  onSubmitEnTete(){
    
    if (this.form.get('Entete').valid==true) {
      this.sophiaLoader.open('', {width: '320px'});
      if (typeof this.form.get('Entete').get('cod_CNSS').value=='string') {
        this.form.get('Entete').get('cod_CNSS').setValue(parseInt(this.form.get('Entete').get('cod_CNSS').value));
      }
      this.mod_cnssS.createUpdate(this.form.get('Entete').value)
      .then(x=>{
        console.log(x);
      })
      .then(x=>{
        if (this.activeajouter == true) {
          this.snackService.openSnackBar("✅ Type CNSS Crée", "OK");
          this.activeajouter = false;
          this.activemodifer = true;
        }else{
          this.snackService.openSnackBar("✅ Type CNSS Modifiée", "OK");
        }
        // this.showTablemodcalPopoverSimple = false;
        this.mod_cnssS.getAll().then(p => {
          // this.fildesConfig = Compte_comptableService.fileds();
          this.listMOD_CNSSS = p;
          // this.showTablemodcalPopoverSimple = true;
          this.cdr.detectChanges();
          this.sophiaLoader.close();
        });
      })
      .catch(x=>{
        this.sophiaLoader.close();
        this.snackService.openSnackBar("❌ Connexion à échoué", "Ok");
      });
    }
  }
  public gettype(column){
    return this.fildesConfig.find(x => x.name === column)
  }
    //Methodes cod_CNSS
    keyupcod_CNSS(event){
    
      let Elemevent = this.listMOD_CNSSS.find(x => String(x[event.target.name]) == String(event.target.value));
      let valevent = event.target.value;
      // if (valevent!="") {
        
      // }else if (valevent==""){
      //   this.form.get('Entete').get(event.target.name).setValue("");
      // }
      if (Elemevent!=undefined){
        this.fildesConfig.forEach(element => {
          if (Object.keys(Elemevent).find(x => x == element.name) != undefined) {
            if (typeof Elemevent[element.name] == 'string') {
              Elemevent[element.name] = Elemevent[element.name].trim();
            }
            this.form.get('Entete').get(element.name).setValue(Elemevent[element.name]);
          }
        });
      } else if (Elemevent == undefined){
        this.form.get('Entete').reset();
        this.form.get('Entete').get(event.target.name).setValue(valevent);
      }
      if (this.activemodifer == true && this.activeajouter == false){
        this.isCollapsedMOD_CNSSS = false;
      }else if (this.activemodifer == false && this.activeajouter == true){
        this.isCollapsedMOD_CNSSS = true;
      }
      this.dataFiltredMOD_CNSSS=event;
    }
    Changecod_CNSS(event){
  
    }
    Clickcod_CNSS(event){
  
    }
    Focuscod_CNSS(event){
  
    }
    Focusoutcod_CNSS(event){
      
    }
    //Fin Methodes cod_CNSS
    //Methodes lib_CNSS
    keyuplib_CNSS(event){
      if (this.form.get('Entete').get("cod_CNSS").value=="") {
        this.dataFiltredMOD_CNSSS = event;
      }
    }
    Changelib_CNSS(event){
  
    }
    Clicklib_CNSS(event){
  
    }
    Focuslib_CNSS(event){
  
    }
    Focusoutlib_CNSS(event){
      
    }
    //Fin Methodes lib_CNSS 
    onReset(){
      // let event :KeyboardEvent;
      
      // this.form = this.compte_comptableS.initialForm(this._formBuilder);
      // this.dataFiltredcompt_compte = event;
    }
}
