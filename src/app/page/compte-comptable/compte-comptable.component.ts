import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppLoaderService } from 'src/app/share/component/app-loader/app-loader.service';
import { SnackebarService } from 'src/app/share/component/snackbar/snackebar.service';
import { Compte_comptableService } from 'src/controller/Compte_comptable.service';

@Component({
  selector: 'app-compte-comptable',
  templateUrl: './compte-comptable.component.html',
  styleUrls: ['./compte-comptable.component.css']
})
export class CompteComptableComponent implements OnInit {
  isCollapsedCompte_comptable=true;
  dataFiltredcompt_compte;
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
  listCompte_comptable=[];
  constructor(
    private sophiaLoader: AppLoaderService,
    private compte_comptableS: Compte_comptableService,
    private _formBuilder:FormBuilder,
    private snackService: SnackebarService,
    private cdr: ChangeDetectorRef
    ) { }
    
    showTablemodcalPopoverSimple=false;
  ngOnInit(): void {
    this.form = this.compte_comptableS.initialForm(this._formBuilder);
    this.fildesConfig = Compte_comptableService.fileds();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    this.compte_comptableS.getAll().then(x => {
      Compte_comptableService.listCompte_comptable = x;
      this.listCompte_comptable = x;
      this.showTablemodcalPopoverSimple = true;
    });
  }
  
  ngDoCheck(event): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.fildesConfig.forEach(element => {
      this.form.get("Entete").get(element.name).setValue(this.form.get("Entete").get(element.name).value);
    });
    const Elemevent = this.listCompte_comptable.find(x => String(x['compt_compte']) == String(this.form.get('Entete').get('compt_compte').value));
    
    if (Elemevent != undefined) {
      this.activeajouter = false;
      this.activemodifer = true;
    } else if (Elemevent == undefined) {
      this.activeajouter = true;
      this.activemodifer = false;
    }
    this.cdr.detectChanges();
  }
  OnGetElementcompt_compte(event){
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
      if (typeof this.form.get('Entete').get('compt_compte').value=='string') {
        this.form.get('Entete').get('compt_compte').setValue(parseInt(this.form.get('Entete').get('compt_compte').value));
      }
      this.compte_comptableS.createUpdate(this.form.get('Entete').value)
      .then(x=>{
        console.log(x);
      })
      .then(x=>{
        if (this.activeajouter == true) {
          this.snackService.openSnackBar("✅ Comptable Crée", "OK");
          this.activeajouter = false;
          this.activemodifer = true;
        }else{
          this.snackService.openSnackBar("✅ Comptable Modifiée", "OK");
        }
        // this.showTablemodcalPopoverSimple = false;
        this.compte_comptableS.getAll().then(p => {
          // this.fildesConfig = Compte_comptableService.fileds();
          this.listCompte_comptable = p;
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
  //Methodes compt_compte
  keyupcompt_compte(event){
    
    let Elemevent = this.listCompte_comptable.find(x => String(x[event.target.name]) == String(event.target.value));
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
      this.isCollapsedCompte_comptable = false;
    }else if (this.activemodifer == false && this.activeajouter == true){
      this.isCollapsedCompte_comptable = true;
    }
    this.dataFiltredcompt_compte=event;
  }
  Changecompt_compte(event){

  }
  Clickcompt_compte(event){

  }
  Focuscompt_compte(event){

  }
  Focusoutcompt_compte(event){
    
  }
  //Fin Methodes compt_compte
  //Methodes lib_compte
  keyuplib_compte(event){
    if (this.form.get('Entete').get("compt_compte").value=="") {
      this.dataFiltredcompt_compte = event;
    }
  }
  Changelib_compte(event){

  }
  Clicklib_compte(event){

  }
  Focuslib_compte(event){

  }
  Focusoutlib_compte(event){
    
  }
  //Fin Methodes lib_compte  
  onReset(event){
    // let event :KeyboardEvent;
    console.log(event);
    
    // this.form = this.compte_comptableS.initialForm(this._formBuilder);
    // this.dataFiltredcompt_compte = event;
  }
}
