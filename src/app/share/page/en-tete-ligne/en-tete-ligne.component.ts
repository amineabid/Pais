import { Component, Input, OnInit } from '@angular/core';
import { PageEnTeteLigneConfig } from './table_dynamque.interface'
@Component({
  selector: 'app-en-tete-ligne',
  templateUrl: './en-tete-ligne.component.html',
  styleUrls: ['./en-tete-ligne.component.css']
})
export class EnTeteLigneComponent implements OnInit {

  @Input()
  page_entet_ligne: PageEnTeteLigneConfig;
  showTable:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  //Methode OutPut
  changeElemnt(event) {
  }
  deleteElemnt(event) {
  }
  createElemnt(event) {
  }
  //Fin Methode OutPut
}
