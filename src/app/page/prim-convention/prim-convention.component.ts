import { ChangeDetectorRef, Component, ElementRef, Host, OnInit, Optional, QueryList, SimpleChanges, Type, ViewChild, ViewChildren } from '@angular/core';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SatPopover } from '@ncstate/sat-popover';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, max, repeat, repeatWhen, startWith } from 'rxjs/operators';
import { FieldConfig } from 'src/app/share/component/componentForms/field.interface';
import { ExampleDataSource } from 'src/app/share/component/table-edting-with-component/table-edting-with-component.component';
import { ConventionService } from 'src/controller/convention.service';
import { Ligne_convService } from 'src/controller/ligne_conv.service';
import { PrimeConventionService } from 'src/controller/InterfaceService/prime-convention.service';
import { Convention } from 'src/model/convention';
import { Ligne_conv } from 'src/model/ligne_conv';
import { IndemniteService } from 'src/controller/indemnite.service';
import { Indemnite } from 'src/model/indemnite';
import { FieldInputConfig } from 'src/app/share/component/input-dynamique/fieldInput.interface';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AppLoaderService } from 'src/app/share/component/app-loader/app-loader.service';
import { SnackebarService } from 'src/app/share/component/snackbar/snackebar.service';


@Component({
  selector: 'app-prim-convention',
  templateUrl: './prim-convention.component.html',
  styleUrls: ['./prim-convention.component.scss']
})
export class PrimConventionComponent implements OnInit {
  listconvention: MatTableDataSource<any>=new MatTableDataSource([]);
  ligne_conv:Ligne_conv[]=[];
  datasource: ExampleDataSource;
  columnsToDisplay: any[];
  columnsToDisplayCnv: string[];
  showTable = false;
  cnvCtrl = new FormControl();
  filteredConvention: Observable<Convention[]>;
  convention: MatTableDataSource<Convention> = new MatTableDataSource([]);
  convention2:Convention[];
  regConfig: FieldConfig[] = [];
  lienreport:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  p:any;
  activeajouter:boolean=false;
  activemodifer:boolean=true;
  public invalid = new BehaviorSubject(false); 

  private _form: FormGroup;
  public get form(): FormGroup {
    return this._form;
  }
  public set form(value: FormGroup) {
    this._form = value;
  }
  @ViewChild(SatPopover) popover: SatPopover;

  @ViewChild('tableConv', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('input') inputs;

  @ViewChildren("row", { read: ElementRef }) rowElement: QueryList<ElementRef>;

  fildesConfig: FieldInputConfig[] = [];
  showdata: boolean = false;

  colorrows: any = [];
  filterdata: Ligne_conv[] = [];
  formGroup: FormGroup;
  ValidationBtn:boolean=false;

  fildthis = new BehaviorSubject<FormGroup>(new FormGroup({})); ;

  constructor(public conventionService: ConventionService,
    private ligneconvsevice:Ligne_convService,
    private thisInterfaceService: PrimeConventionService,
    public _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackService: SnackebarService,
    private sophiaLoader: AppLoaderService
    ) {
    
      
    // console.log(document.querySelectorAll('inputEntete'));
    // document.querySelectorAll('input')[0].setAttribute("autofocus", "true");
    }
//simple teble popover
  showTablePopoverSimple=false;
  dataPopoverSimple;
  fildesConfigPopoverSimple;
  inisialisationTableSimple(){
    //await sleep(400);
   this.fildesConfigPopoverSimple= ConventionService.filedConvention();
    
    this.dataPopoverSimple = ConventionService.listConv;
    this.showTablePopoverSimple =true;
  }
  OnGetElementTablePopoOverSimple(event){
    
    Object.keys(event).forEach(element => {
      
      if (this.form.get("Entete").get(element)!=null) {
        this.form.get("Entete").get(element).setValue(event[element]);
      }
      
    });
    this.showelement(this.form.get("Entete").value)
    this.activeajouter = false;
    this.activemodifer = true;
  }

//fin code simple table popover
//Methode OutPut
  changeElemnt(event){
    // console.log(event);
    
  }
  deleteElemnt(event){
    // console.log(event);
  }
  createElemnt(event){
    // console.log(event);
  }
//Fin Methode Output
 

  submit(event){
    // console.log(event)
  }
//Methode card subtitle
  OpenHelpOnClick(event){
    // console.log(event);
  }
  dataFiltredPopoverSimple;
  model = 1;
  OpenHelp(event){

    // this.applyFilter(event.target.value, event.target.name)
    // if(event){

    // }
    // if (event.key != "Enter"){

   
    // this.showTablePopoverSimple = false;
    // let fild = this.fildesConfigPopoverSimple;
    // fild.forEach(element => {
    //   if (element.name == event.target.name){
    //     element.value = event;
    //   }
    // });
    // this.fildesConfigPopoverSimple = fild ;
    // await sleep(200);
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    this.showTablePopoverSimple=false
    
    this.dataFiltredPopoverSimple=event;
    // await sleep(5);
    this.showTablePopoverSimple=true
    ConventionService.filedConvention().forEach(colelement => {
      if (colelement.name == event.target.name) {
        if (colelement.getLbythis == true) {
          if (this.form.get("Entete").get(event.target.name).invalid){
            //this.form.get("Entete").reset();
            this.formGroup = this.form = PrimeConventionService.initialForm(this._formBuilder);
            // this.showdata=false;
            return;
          }
          let filtred = PrimeConventionService.alllistconvention;
          filtred = filtred.find(x => String(x[event.target.name]) === String(event.target.value))
          if (filtred != undefined) {
            ConventionService.filedConvention().forEach(colelementup => {
              
              if (colelementup.name != event.target.name) {
                this.form.get("Entete").get(colelementup.name).setValue(filtred[colelementup.name]);
                this.activeajouter = false;
                this.activemodifer = true;
              }
                
            });
            // if (this.form.get("Entete").get(event.target.name).valid) {
            //   this.showelement(this.form.get("Entete").value)
            // }
            
          }else{
            this.activeajouter = true;
            this.activemodifer = false;
            this.formGroup = this.form = PrimeConventionService.initialForm(this._formBuilder);
            ConventionService.filedConvention().forEach(colelementup => {

              if (colelementup.name == event.target.name) {
                this.form.get("Entete").get(colelementup.name).setValue(event.target.value);
              }else{
                this.form.get("Entete").get(colelementup.name).setValue('');
              }

            });
            // this.formGroup = this.form = PrimeConventionService.initialForm(this._formBuilder);
          }
          this.showelement(this.form.get("Entete").value)
        }
      }
    });
    // }else{
    //   this.popover.close();
    // }
    
  }
  OpenHelpOnCHange(event){

  }
  //Fin methode subtitle
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.cdr.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }
  async ngAfterViewInit(): Promise<void> {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // await sleep(100);
    // setTimeout(() => {
    //   // if (this.inputs.first!=undefined){
    //   //   this.inputs.first.nativeElement.focus();
    //   // }
    //   console.log(this.inputs.first.nativeElement.focus =true);
      
    // }, 1000);
    
  }
  ngOnInit():void {
    // new PrimeConventionService(this.ligneconvsevice, this.conventionService);
    this.formGroup =this.form = PrimeConventionService.initialForm(this._formBuilder);
    this.invalid.next(this.form.invalid);
    
    
    // this.fildthis.next(this.formGroup);
    
    //start Inisitialtisation attrubute
    // this.listconvention= new MatTableDataSource([]);
    // this.ligne_conv = [];
    // this.datasource;
    this.columnsToDisplay=[];
    this.columnsToDisplayCnv=[];
    // this.showTable = false;
    // this.cnvCtrl = new FormControl();
    // this.filteredConvention;
    
    
    this.convention = new MatTableDataSource(ConventionService.listConv);
    this.convention2=[];
    // this.regConfig  = [];
    this.fildesConfig= [];
    this.showdata= false;
    this.colorrows=[];
    // this.filterdata = [];
    //Fin Inisitialtisation attrubute
    this.fildesConfig = ConventionService.filedConvention();
    this.columnsToDisplayCnv = ConventionService.filedConvention().map(x => x.name);

    // do {
      // Promise.resolve(ConventionService.listConv).then(
      //   (val)=>{
      //     ConventionService.listConv = val;
      //   }
      // );
      // await sleep(100);
      this.sophiaLoader.open(``, {width: '320px'});
      this.conventionService.getAll().then((a)=>{
        ConventionService.listConv = a;
        this.convention.data = ConventionService.listConv;
        this.convention2 = ConventionService.listConv;
        this.showdata = true;
        this.regConfig = Ligne_convService.filedLigneConvention();
        this.showTable = true;
        this.inisialisationTableSimple();
        this.sophiaLoader.close();
      })
      
    // } while (ConventionService.listConv==undefined);
    // await sleep(100);
    // await sleep(400);
    
    // this.lienreport = this.ligne_convService.getReportLien()

    // this.fildthis =  new BehaviorSubject<FormGroup>(this.formGroup);
    

    
  }
  getType(nameOfColumn:string){
    return this.fildesConfig.find(w => w.name === nameOfColumn)
  }

  async showelement(elem:any){
    // Object.keys((this.form.get("Entete") as FormGroup).controls).forEach(e=> {
    //   (this.form.get("Entete") as FormGroup).get(e).setValue(elem[e]);
    // });
   // console.log((this.form.get("Entete") as FormGroup).getRawValue());
    // (this.form.get("Enligne") as FormGroup).controls = this.thisInterfaceService.getligne((this.form.get("Entete") as FormGroup).getRawValue());
    
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    //  console.log(this.fildthis);
    this.showdata = false;
    this.thisInterfaceService.getligne((this.form.get("Entete") as FormGroup).getRawValue()).then((x)=>{
      
      this.form = x
      this.showdata = true;
      this.showTable = true;
    });
    //console.log(this.form);
    
   //this.fildthis.next(this.formGroup);
    // console.log(this.fildthis);
    // await sleep(10);
    
    
    
  }
  showtablee(event){
    // console.log(event);
  }


  applyFilter(event,column) {
    let filterValue = String(event);
   
    
    filterValue = filterValue.toLowerCase();
    if(filterValue==""){
      this.convention.data = this.convention2;
      this.colorrows=[];
      return;
    }
    
    
    this.convention.filterPredicate = (data: any, filter: string) => {
      return String(data[column]).toLowerCase().includes(filterValue) 
    };
    this.convention.filter = filterValue;
    let a1 = this.convention.data;
    
    
    this.colorrows = this.convention.filteredData;
    moveItemInArray(this.colorrows, this.colorrows.findIndex(item => item[column] == filterValue), 0);
    let a2 = this.colorrows;
    a2 = a2.concat(a1.filter(item => !a2.includes(item)));
    this.convention.data = a2;
  }
  getColorfind(row){
    if(row==undefined){return '';}
    if (this.colorrows.find(item => item == row) != undefined){
      if (this.colorrows.findIndex(item => item == row) == 0) {
        return 'lightblue';
      } else {
        return '#e0e0e0';
      }
    }else{
      return '';
    }
  }
  displayCounter(event){
    // console.log(event)
  }

  async showdataligne_conv(value){
    this.popover.close();
  }
  deleteAll(){
    
    this.submitted = true;

    if (this.form.get('Entete').valid) {
      this.sophiaLoader.open('', {width: '320px'});
    this.showTablePopoverSimple = false
    let event :KeyboardEvent;

    
    this.dataFiltredPopoverSimple = event;
    this.ligneconvsevice.deletelist(this.form.get('Entete').value).then(d=>{
      this.conventionService.delete(this.form.get('Entete').value).then(l=>{
        this.showTablePopoverSimple = false
        let event :KeyboardEvent;

    
        this.dataFiltredPopoverSimple = event;
          this.conventionService.getAll().then(a=>{
          ConventionService.listConv = a;
          this.convention.data = ConventionService.listConv;
          this.convention2 = ConventionService.listConv;
          this.dataPopoverSimple = ConventionService.listConv;
          // if (this.activeajouter == true) {
          //   this.snackService.openSnackBar("✅ Convention Crée", "OK");
          //   this.activeajouter = false;
          //   this.activemodifer = true;
          // }else{
          //   this.snackService.openSnackBar("✅ Convention Modifiée", "OK");
          // }
          this.activeajouter = true;
          this.activemodifer = false;
          this.snackService.openSnackBar("✅ Convention Supprimer", "OK");
          this.Reset();
          this.showTablePopoverSimple = true;
          this.sophiaLoader.close();
        })
        
        
      })
    })
    }
    
  }
  async Reset(){
    this.submitted = false;
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // this.dataPopoverSimple = PrimeConventionService.alllistconvention;
    // this.showTablePopoverSimple = true;
    // this.popover.open();

    this.showTablePopoverSimple = false
    this.form.get('Entete').reset();
    this.formGroup = this.form = PrimeConventionService.initialForm(this._formBuilder);
    let event :KeyboardEvent;

    
    this.dataFiltredPopoverSimple = event;
    await sleep(5);
    this.showTablePopoverSimple = true
  }
  SubmitallData(){
    // console.log(this.filterdata);
    // console.log(this.convention.data)
    // console.log(this.form.get('Entete').value);
    // console.log(this.form.getRawValue());


    this.sophiaLoader.open('', {width: '320px'});

    

    this.showTablePopoverSimple = false
    let event :KeyboardEvent;

    
    this.dataFiltredPopoverSimple = event;
    let rowSubmit = this.form.getRawValue();
    // console.log(rowSubmit['Entete']);
    // console.log((rowSubmit['Enligne'])['lignes']);
    //this.sophiaLoader.open("", {width: '320px'});
    this.conventionService.createUpdate(rowSubmit['Entete']).then(x=>{
      this.ligneconvsevice.deletelist(x).then(d=>{
        this.ligneconvsevice.createUpdatelist((rowSubmit['Enligne'])['lignes'])
        .then(j=>{
          this.conventionService.getAll().then(a=>{
            ConventionService.listConv = a;
            this.convention.data = ConventionService.listConv;
            this.convention2 = ConventionService.listConv;
            this.dataPopoverSimple = ConventionService.listConv;
            if (this.activeajouter == true) {
              this.snackService.openSnackBar("✅ Convention Crée", "OK");
              this.activeajouter = false;
              this.activemodifer = true;
            }else{
              this.snackService.openSnackBar("✅ Convention Modifiée", "OK");
            }
            this.sophiaLoader.close();
            this.showTablePopoverSimple = true;
          })
          
        })
        
      })
    })
    // .then(r=>{
    //   this.sophiaLoader.close();
    // })
    
  }
  submitted=false;
  onSubmitEnTete(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.get('Entete').invalid) {
      return;
    }
    this.showelement(this.form.get("Entete").value)
  }
  async onReset() {
    this.submitted = false;
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // this.dataPopoverSimple = PrimeConventionService.alllistconvention;
    // this.showTablePopoverSimple = true;
    // this.popover.open();

    this.showTablePopoverSimple = false
    this.form.get('Entete').reset();
    this.formGroup = this.form = PrimeConventionService.initialForm(this._formBuilder);
    let event :KeyboardEvent;

    
    this.dataFiltredPopoverSimple = event;
    await sleep(5);
    this.showTablePopoverSimple = true

  }
  getdisabled(){
    // this.cdr.detectChanges();

    return this.form.invalid;
  }
}

