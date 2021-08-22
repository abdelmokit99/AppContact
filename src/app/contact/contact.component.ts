import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ListContactsComponent} from "../list-contacts/list-contacts.component";
import {Router} from "@angular/router";
import {AdresseService} from "../service/adresse.service";
import {Adresse} from "../Models/adresse";

import { AllCommunityModules, Module } from '@ag-grid-community/all-modules'
import {Observable, of, Subject, Subscription} from "rxjs";
import {GridApi, GridOptions} from "ag-grid-community";
import {Contact} from "../Models/contact";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../service/contact.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,GridOptions, OnDestroy {



  selectedRow = {};
  isVisible = false;
  Form: FormGroup;
  public modules: Module[] = AllCommunityModules;



  adresseSubscription : Subscription;
  @Input() contact : Contact;
  @Input() nom: string;
  @Input() prenom: string;
  @Input() dateNaissance: string;
  @Input() id: string;
  @Input() index: number;
  @Input() tab_adresse: Adresse[];
  @Input() contactSubscription: Subscription;

  columnDefs = [
    {headerName: "type d'adresse", field:"type"},
    {headerName: "numero de voie", field: 'numeroVoie',sortable: true,filter: true },
    {headerName: "type de voie", field: 'typeVoie',sortable: true,filter: true },
    {headerName: "nom de voie", field: 'nomVoie',sortable: true,filter: true },
    {field: 'ville', sortable: true, filter: true},
    {field: 'cp', sortable: true, filter: true},
    {field: 'pays', sortable: true, filter: true},
    {field: 'numero', sortable: true, filter: true},
    {field: 'commentaire'}];



  adresses: Adresse[];
  rowData = [
    { type: "",
      numeroVoie: "",
      typeVoie: "",
      nomVoie: "",
      ville:"",
      cp: 0,
      pays: "",
      numero: "",
      commentaire: "" }];
  defaultColDef = {
    editable : true
  } ;

  /*rowData = [
    { type: "domicile", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak" },
    { type: "pére", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak" },
    { type: "mére", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamakdiha fmamak diha fmamak diha fmamak" },
    { type: "travail", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak" }
  ];*/

  constructor(private adresseService: AdresseService,
              private listContactService: ListContactsComponent,
              private fb: FormBuilder,
              private contactService: ContactService,
              private router: Router) {
    this.Form = this.fb.group({
      nom : ['',Validators.required],
      prenom : ['',Validators.required],
      dateNaissance : ['',Validators.required],
    })
    this.nom = "";
    this.prenom = "";
    this.dateNaissance = "";
    this.id = "";
    this.adresses = []
    this.tab_adresse = []
    this.index = 0;
    this.adresseSubscription = new Subscription();
    this.contact = new Contact()
    this.contactSubscription = new Subscription();
  }






  ngOnInit(): void {
    this.Form = this.fb.group(
      {
        nom : ['',Validators.required],
        prenom : ['',Validators.required],
        dateNaissance : ['',Validators.required]
      });
    this.rowData= [];
    console.log(this.tab_adresse)
    if(this.tab_adresse.length > 0) {
      for(let adresse of this.tab_adresse){
        this.rowData.push(
          {
            type: ""+adresse.typeAdresse,
            numeroVoie: ''+adresse.numero,
            typeVoie: adresse.typeVoie,
            nomVoie: adresse.rue,
            ville: ""+adresse.ville,
            cp: adresse.cp,
            pays: adresse.pays,
            numero: adresse.numeroTelephone,
            commentaire: adresse.commentaire

      }
        )
      }
    }
  }



  deleteContact() {
    this.listContactService.deleteContact(this.index);
  }

  /**
   *
   *
   *
   * j'ai fai ici puisque le script de modification n'a pas marché pour moi,
   *  une supression du contact, et la re creation d'un selon nos désirs.
   * @constructor
   */

  ModifyContact(){
    this.isVisible = true;
    /*
    this.deleteContact();
    this.router.navigate(['/adresseForm/']);
    this.contactSubscription.unsubscribe();*/
  }


  ngOnDestroy() {
    this.adresseSubscription.unsubscribe();
  }


  SubmitModif(){
    console.log(this.rowData);
    const formValue = this.Form.value;
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(formValue['dateNaissance'], 'dd-MM-yyyy')
    if (formValue['nom'] !== '') {this.contact.nom = formValue['nom'];}
    if (formValue['prenom'] !== '') {this.contact.prenom = formValue['prenom']}
    if (formValue['dateNaissance'] !== '') {this.contact.date_naissance = ""+formattedDate;}
    this.contact.adresse = [];
    for(let adresse of this.rowData){
      this.contact.adresses.push(new Adresse( adresse.type, adresse.typeVoie, adresse.nomVoie, +adresse.numeroVoie , adresse.ville, adresse.cp, adresse.pays,adresse.numero, adresse.commentaire))
    }
    this.contactService.updateContact(this.contact).subscribe(
      value => console.log("contact modifié")
    )
    this.isVisible = false;
  }
  addAdresse(){
    let aux= this.rowData
    this.rowData=[]
    for(let row of aux){
      this.rowData.push(row)
    }
    this.rowData.push(
      {
        type: "Entrez une valeur",
        numeroVoie: "Entrez une valeur",
        typeVoie: "Entrez une valeur",
        nomVoie: "Entrez une valeur",
        ville:"Entrez une valeur",
        cp: 0,
        pays: "Entrez une valeur",
        numero: "Entrez une valeur",
        commentaire: "Entrez une valeur"}
    )
  }

  deleteRow(){
    this.rowData = this.rowData.filter(
      element => element !== this.selectedRow
    );

  }

  onRowClicked(event: any) {
    this.selectedRow = event.data
    console.log('row', this.selectedRow);
  }
}
