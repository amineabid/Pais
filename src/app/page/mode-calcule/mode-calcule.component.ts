import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppLoaderService } from 'src/app/share/component/app-loader/app-loader.service';
import { SnackebarService } from 'src/app/share/component/snackbar/snackebar.service';
import { MOD_CalculeService } from 'src/controller/mod_calcule.service';

@Component({
  selector: 'app-mode-calcule',
  templateUrl: './mode-calcule.component.html',
  styleUrls: ['./mode-calcule.component.css']
})
export class ModeCalculeComponent implements OnInit {

  isCollapsedMOD_Calcule=true;
  dataFiltredcod_MC;
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
  listmodcalule=[];
  constructor(
    private sophiaLoader: AppLoaderService,
    private mod_caluceS: MOD_CalculeService,
    private _formBuilder:FormBuilder,
    private snackService: SnackebarService,
    private cdr: ChangeDetectorRef
    ) { }
    
    showTablemodcalPopoverSimple=false;
  ngOnInit(): void {
    this.form = this.mod_caluceS.initialForm(this._formBuilder);
    this.fildesConfig = MOD_CalculeService.fileds();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    this.mod_caluceS.getAll().then(x => {
      MOD_CalculeService.listmodcalule = x;
      this.listmodcalule = x;
      this.showTablemodcalPopoverSimple = true;
    });
  }
  
  ngDoCheck(event): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.fildesConfig.forEach(element => {
      this.form.get("Entete").get(element.name).setValue(this.form.get("Entete").get(element.name).value);
    });
    const Elemevent = this.listmodcalule.find(x => String(x['cod_MC']) == String(this.form.get('Entete').get('cod_MC').value));

    
    if (Elemevent != undefined) {
      this.activeajouter = false;
      this.activemodifer = true;
    } else if (Elemevent == undefined) {
      this.activeajouter = true;
      this.activemodifer = false;
    }
    this.cdr.detectChanges();
  }
  OnGetElementcod_MC(event){
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
      if (typeof this.form.get('Entete').get('cod_MC').value=='string') {
        this.form.get('Entete').get('cod_MC').setValue(parseInt(this.form.get('Entete').get('cod_MC').value));
      }
      this.mod_caluceS.createUpdate(this.form.get('Entete').value)
      .then(x=>{
        console.log(x);
      })
      .then(x=>{
        if (this.activeajouter == true) {
          this.snackService.openSnackBar("✅ Mode de calcul Crée", "OK");
          this.activeajouter = false;
          this.activemodifer = true;
        }else{
          this.snackService.openSnackBar("✅ Mode de calcul Modifiée", "OK");
        }
        // this.showTablemodcalPopoverSimple = false;
        this.mod_caluceS.getAll().then(p => {
          // this.fildesConfig = MOD_CalculeService.fileds();
          this.listmodcalule = p;
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
  //Methodes cod_MC
  keyupcod_MC(event){
    
    let Elemevent = this.listmodcalule.find(x => String(x[event.target.name]) == String(event.target.value));
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
      this.isCollapsedMOD_Calcule = false;
    }else if (this.activemodifer == false && this.activeajouter == true){
      this.isCollapsedMOD_Calcule = true;
    }
    this.dataFiltredcod_MC=event;
  }
  Changecod_MC(event){

  }
  Clickcod_MC(event){

  }
  Focuscod_MC(event){

  }
  Focusoutcod_MC(event){
    
  }
  //Fin Methodes cod_MC
  //Methodes lib_Mc
  keyuplib_MC(event){
    if (this.form.get('Entete').get("cod_MC").value=="") {
      this.dataFiltredcod_MC = event;
    }
  }
  Changelib_MC(event){

  }
  Clicklib_MC(event){

  }
  Focuslib_MC(event){

  }
  Focusoutlib_MC(event){
    
  }
  //Fin Methodes lib_Mc  
  onReset(event){
    // let event :KeyboardEvent;
    console.log(event);
    
    // this.form = this.mod_caluceS.initialForm(this._formBuilder);
    // this.dataFiltredcod_MC = event;
  }
}
