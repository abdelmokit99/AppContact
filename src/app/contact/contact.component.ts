import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ListContactsComponent} from "../list-contacts/list-contacts.component";
import {Router} from "@angular/router";
import {AdresseService} from "../service/adresse.service";
import {Adresse} from "../Models/adresse";

import { AllCommunityModules, Module } from '@ag-grid-community/all-modules'
import {Observable, of, Subject, Subscription} from "rxjs";
import {GridApi, GridOptions} from "ag-grid-community";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,GridOptions, OnDestroy {


  public modules: Module[] = AllCommunityModules;

  adresseSubscription : Subscription;
  auxObservable: Observable<Adresse>;

  @Input() nom: string;
  @Input() prenom: string;
  @Input() dateNaissance: string;
  @Input() id: string;
  @Input() index: number;
  @Input() tab_adresse: string[];

  columnDefs = [
    {field: 'type', sortable: true, filter: true},
    {field: 'adresse', sortable: true, filter: true},
    {field: 'ville', sortable: true, filter: true},
    {field: 'cp', sortable: true, filter: true},
    {field: 'pays', sortable: true, filter: true},
    {field: 'numero', sortable: true, filter: true},
    {field: 'commentaire'}];



  adresses: Adresse[];
  rowData = [
    { type: "domicile", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak" }];

  /*rowData = [
    { type: "domicile", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak" },
    { type: "pére", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak" },
    { type: "mére", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamakdiha fmamak diha fmamak diha fmamak" },
    { type: "travail", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak" }
  ];*/

  constructor(private adresseService: AdresseService, private listContactService: ListContactsComponent, private router: Router) {
    this.nom = "";
    this.prenom = "";
    this.dateNaissance = "";
    this.id = "";
    this.adresses = []
    this.tab_adresse = []
    this.index = 0;
    this.adresseSubscription = new Subscription();
    this.auxObservable = new Observable<Adresse>();
  }

  ngOnInit(): void {
    this.getAdresses();
    this.auxObservable.subscribe(
      adresse =>{
        this.adresses.push(adresse);
      }
    )
    for (let adresse of this.adresses){
      this.rowData.push(
        {
          type: adresse.typeAdresse,
          adresse: ""+adresse.numero+" "+adresse.typeVoie+" "+adresse.rue,
          ville: adresse.ville,
          cp: adresse.cp,
          pays: adresse.pays,
          numero: adresse.numeroTelephone,
          commentaire: adresse.commentaire
        })
    }
  }

  addAdresse(typeAdresse: string, numero: number, typeVoie: string, rue: string, ville: string, cp: number, pays: string, telephone: string, commentaire: string) {
    this.rowData.push({
      type: typeAdresse,
      adresse: "" + numero + " " + typeVoie + " " + rue,
      ville: ville,
      cp: cp,
      pays: pays,
      numero: telephone,
      commentaire: commentaire
    });
  }

  deleteContact() {
    this.listContactService.deleteContact(this.index);
  }

  getAdresses() {
    this.adresseSubscription = this.adresseService.getAdresses().subscribe(
      adresses => {
        this.adresses = adresses;
      }
    )
  }


  getAdresse(id: string){
     this.auxObservable = this.adresseService.getAdresse(id);
  }


  ngOnDestroy() {
    this.adresseSubscription.unsubscribe();
  }

}
