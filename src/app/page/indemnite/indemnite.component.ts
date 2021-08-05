import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { map, max } from 'rxjs/operators';
import { AppLoaderService } from 'src/app/share/component/app-loader/app-loader.service';
import { SnackebarService } from 'src/app/share/component/snackbar/snackebar.service';
import { Compte_comptableService}from 'src/controller/Compte_comptable.service'
import { IndemniteService } from 'src/controller/indemnite.service';
import { MOD_CalculeService } from 'src/controller/mod_calcule.service';
import { MOD_CNSSService } from 'src/controller/mod_cnss.service';
@Component({
  selector: 'app-indemnite',
  templateUrl: './indemnite.component.html',
  styleUrls: ['./indemnite.component.scss']
})
export class IndemniteComponent implements OnInit {

  public isCollapsedIndemnite = true;
  public isCollapsedCompte_comptable = true;
  public isCollapsedMOD_Calcule = true;
  public isCollapsedMOD_CNSSS = true;
  constructor(
    private sophiaLoader: AppLoaderService,
    private compte_comptableS:Compte_comptableService,
    private indiemniteS:IndemniteService,
    private mod_caluceS: MOD_CalculeService,
    private mod_cnssS: MOD_CNSSService,
    private _formBuilder:FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackService: SnackebarService,
  ) {
    console.log("this constracter");
    
  }
  fildesConfig;
  activeajouter=true;
  activemodifer=false;
  submitted=false;
  private _form: FormGroup;
  public get form(): FormGroup {
    return this._form;
  }
  public set form(value: FormGroup) {
    this._form = value;
  }
  showTableIndPopoverSimple=false;
  showTablecptcptPopoverSimple=false;
  showTablemodcalPopoverSimple=false;
  showTablemodcnssPopoverSimple=false;
  dataPopoverSimple
  fildesConfigPopoverSimple
  dataFiltredPopoverSimple;
  filterInputChecked;
  filterInputnumber;
  filterInputtext;
  filterInputNotChecked;
  

  
  

  ngOnInit():void {
    this.form = this.indiemniteS.initialForm(this._formBuilder);
    this.fildesConfig = this.indiemniteS.filedIndemnite();
    
    // this.filterInputChecked = this.fildesConfig.filter(x => x.inputType == 'checkbox');
    // this.filterInputnumber = this.fildesConfig.filter(x => x.inputType == 'number');
    // this.filterInputtext = this.fildesConfig.filter(x => x.inputType == 'text');
    // this.filterInputNotChecked = this.fildesConfig.filter(x => x.inputType != 'checkbox');
    this.sophiaLoader.open('', {width: '320px'});
    this.indiemniteS.getAll().then(p => {
      this.fildesConfig.find(l => l.name === "cod_IND").table[0].displayedColumns[0].name = this.fildesConfig.filter(x => x.name == 'cod_IND' || x.name == 'lib_IND' || x.name == 'mt_IND' || x.name == 'pour_IND');
      this.fildesConfig.find(x => x.name === "cod_IND").table[0].data = p;
      this.listIndim = p;
      this.showTableIndPopoverSimple = true;
      this.compte_comptableS.getAll().then(x => {
        this.fildesConfig.find(x => x.name === "cptcpt_IND").table[0].data = x;
        IndemniteService.listcomptecomp = x;
        this.showTablecptcptPopoverSimple = true;
        this.mod_caluceS.getAll().then(x => {
          this.fildesConfig.find(x => x.name === "cal_IND").table[0].data = x;
          IndemniteService.listmodcalule = x;
          this.showTablemodcalPopoverSimple = true;
          this.mod_cnssS.getAll().then(x => {
            this.fildesConfig.find(x => x.name === "codcn_IND").table[0].data = x;
            IndemniteService.listmodcnss = x;
            this.showTablemodcnssPopoverSimple = true;
            this.sophiaLoader.close();
          });
        });
        
      });
      
    });
    

  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.

    // this.cdr.detectChanges();

  }
  listIndim=[];
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
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
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    
  }
  
  ngDoCheck(event): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.fildesConfig.forEach(element => {
      this.form.get("Entete").get(element.name).setValue(this.form.get("Entete").get(element.name).value);
    });
    const Elemevent = this.listIndim.find(x => x['cod_IND'] == this.form.get('Entete').get('cod_IND').value);
    if (Elemevent != undefined) {
      this.activeajouter = false;
      this.activemodifer = true;
    } else if (Elemevent == undefined) {
      this.activeajouter = true;
      this.activemodifer = false;
    }
    this.cdr.detectChanges();
  }
  public getfilterInput(){
    return this.fildesConfig.filter(x => x.inputType != 'checkbox');
  }
  public gettype(column){
    return this.fildesConfig.find(x => x.name === column)
  }
  OnGetElementTablePopoOverSimple(event){

  }
  onReset(){
    this.submitted = false;
  }
  onSubmitEnTete(){
    this.submitted=true;
    
    if (this.form.get('Entete').valid==true) {
      
      this.sophiaLoader.open('', {width: '320px'});
      if (typeof this.form.get('Entete').get('cod_IND').value=='string') {
        this.form.get('Entete').get('cod_IND').setValue(parseInt(this.form.get('Entete').get('cod_IND').value));
      }
      this.indiemniteS.createUpdate(this.form.get('Entete').value)
      .then(x=>{
        console.log(x);
      })
      .then(x=>{
        if (this.activeajouter == true) {
          this.snackService.openSnackBar("✅ indiemnite Crée", "OK");
          this.activeajouter = false;
          this.activemodifer = true;
        }else{
          this.snackService.openSnackBar("✅ indiemnite Modifiée", "OK");
        }
        this.indiemniteS.getAll().then(p => {
          this.fildesConfig.find(l => l.name === "cod_IND").table[0].displayedColumns[0].name = this.fildesConfig.filter(x => x.name == 'cod_IND' || x.name == 'lib_IND' || x.name == 'mt_IND' || x.name == 'pour_IND');
          this.fildesConfig.find(x => x.name === "cod_IND").table[0].data = p;
          this.listIndim = p;
          this.cdr.detectChanges();
          this.sophiaLoader.close();
        });
      })
      .catch(x=>{
        this.snackService.openSnackBar("❌ Connexion à échoué", "Ok");
      });
    }
  }
  OpenHelp(event){
    this.dataFiltredPopoverSimple = event
  }
  OpenHelpOnClick(event){

  }
  OpenHelpOnCHange(event){

  }
  methodecheck(event){
    console.log(event);
    
  }
  //atrubute table Indimte
  dataFiltredIndemnite
  OnGetElementIndemnite(event){
    this.fildesConfig.forEach(element => {
      if (Object.keys(event).find(x => x == element.name)!=undefined){
        if (typeof event[element.name] == 'string') {
          event[element.name] = event[element.name].trim();
        }
        this.form.get('Entete').get(element.name).setValue(event[element.name]);
      }
    });

  }
  //cod_IND
  Focuscod_IND(event) {
    this.isCollapsedIndemnite = false;
  }
  Focusoutcod_IND(event) {
    this.isCollapsedIndemnite = true;
  }
  keyupcod_IND(event){
    let Elemevent = this.fildesConfig.find(x => x.name === "cod_IND").table[0].data.find(x => x[event.target.name] == event.target.value);
    let valevent = event.target.value;
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
      this.isCollapsedIndemnite = false;
    }else if (this.activemodifer == false && this.activeajouter == true){
      this.isCollapsedIndemnite = true;
    }
    //this.isCollapsedIndemnite =false;
    // this.isCollapsedCompte_comptable
    // this.isCollapsedMOD_Calcule
    // this.isCollapsedMOD_CNSSS
    this.dataFiltredIndemnite = event;
  }
  Changecod_IND(event) {
    
  }
  Clickcod_IND(event) {

  }
  //Fin codInd
  //lib_IND
  
  keyuplib_IND(event){
    // console.log(event.target.name);
    
    // let Elemevent = this.listIndim.find(x => x[event.target.name].toLowerCase().includes(event.target.value.toLowerCase()));
    // let valevent = event.target.value;
    // if (Elemevent != undefined) {
    //   // this.fildesConfig.forEach(element => {
    //   //   if (Object.keys(Elemevent).find(x => x == element.name) != undefined) {
    //   //     if (typeof Elemevent[element.name] == 'string') {
    //   //       Elemevent[element.name] = Elemevent[element.name].trim();
    //   //     }
    //   //     this.form.get('Entete').get(element.name).setValue(Elemevent[element.name]);
    //   //   }
    //   // });
    //   this.form.get('Entete').get("cod_IND").setValue(Elemevent["cod_IND"]);
      
    //   this.activeajouter = false;
    //   this.activemodifer = true;
    // } else if (Elemevent == undefined) {
      
    //   let maxcodind = Math.max(...this.listIndim.map(x => x["cod_IND"])) + 1;
    //   this.form.get('Entete').get("cod_IND").setValue(maxcodind);
    //   this.activeajouter = true;
    //   this.activemodifer = false;
    //   // this.form.get('Entete').reset();
    //   // this.form.get('Entete').get(event.target.name).setValue(valevent);
    // }
    if (this.form.get('Entete').get("cod_IND").value=="") {
      this.dataFiltredIndemnite = event;
    }
    
  }
  Changelib_IND(event) {

  }
  Clicklib_IND(event) {

  }
  //Fin lib_IND
  //abrev_ind
  keyupabrev_ind(event) {

  }
  Changeabrev_ind(event) {

  }
  Clickabrev_ind(event) {

  }
  //Fin abrev_ind
  //atrubute table Mod_Calcul
  dataFiltredcal_IND
  OnGetElementcal_IND(event) {
    this.form.get('Entete').get('cal_IND').setValue(event['cod_MC']);
  }
  //cal_IND
  keyupcal_IND(event) {
    this.dataFiltredcal_IND = event;
  }
  Changecal_IND(event) {

  }
  Clickcal_IND(event) {

  }
  //Fin cal_IND
  //atrubute table Mod_CNSS
  dataFiltredcodcn_IND
  OnGetElementcodcn_IND(event) {
    this.form.get('Entete').get('codcn_IND').setValue(event['cod_CNSS']);
  }
  //codcn_IND
  keyupcodcn_IND(event) {
    this.dataFiltredcodcn_IND = event;
  }
  Changecodcn_IND(event) {

  }
  Clickcodcn_IND(event) {

  }
  //Fin codcn_IND
  //atrubute table cptcpt_IND
  dataFiltredcptcpt_IND
  OnGetElementcptcpt_IND(event) {
    this.form.get('Entete').get('cptcpt_IND').setValue(event['compt_compte']);
    console.log(event);
  }
  //cptcpt_IND
  keyupcptcpt_IND(event) {
    this.dataFiltredcptcpt_IND = event;
  }
  Changecptcpt_IND(event) {

  }
  Clickcptcpt_IND(event) {

  }
  //Fin cptcpt_IND
}
