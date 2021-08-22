import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {AllCommunityModules, Module} from "@ag-grid-community/all-modules";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Adresse} from "../Models/adresse";
import {Contact} from "../Models/contact";
import {ContactService} from "../service/contact.service";
import {AdresseService} from "../service/adresse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-modifier-contact',
  templateUrl: './modifier-contact.component.html',
  styleUrls: ['./modifier-contact.component.css']
})
export class ModifierContactComponent implements OnInit {



  public modules: Module[] = AllCommunityModules;

  columnDefs = [
    {field: 'type', sortable: true, filter: true},
    {field: 'adresse', sortable: true, filter: true},
    {field: 'ville', sortable: true, filter: true},
    {field: 'cp', sortable: true, filter: true},
    {field: 'pays', sortable: true, filter: true},
    {field: 'numero', sortable: true, filter: true},
    {field: 'commentaire'}];


  rowData = [
    { type: "", adresse: "", ville:"", cp: 0, pays: "",numero: "", commentaire: "" }
  ];

  Form: FormGroup;
  adress : Adresse[];
  contacts : Contact[];
  contact : Contact;
  id: string;
  constructor(private fb: FormBuilder,
              private contactService: ContactService,
              private adresseService : AdresseService,
              private router: Router,private route: ActivatedRoute) {
    this.Form = this.fb.group({
      nom : ['',Validators.required],
      prenom : ['',Validators.required],
      dateNaissance : ['',Validators.required],
      typeAdresse : '',
      telephone : '',
      typeVoie : '',
      rue : '',
      numeroVoie : '',
      ville : '',
      cp : '',
      pays : '',
      commentaire : ''
    })
    this.adress = [];
    this.contact = new Contact();
    this.id = "";
    this.contacts = []
  }


  /**
   *
   *
   * ici j'ai trouvé un probléme je ne peux pas obtenir le contact .
   * j'ai cherché beaucoups mais j'ai pas trouvé pourquoi.
   *
   *
   */
  ngOnInit() {
    this.id =  this.route.snapshot.params['id'];

    this.contactService.getContact(this.id).subscribe(
      contact => {
        this.contact = contact
      }
    )
    console.log(this.contact.adresse)
    for(let cont of this.contacts) {
      if ( cont.id === this.id) {
        this.contact = cont
      }
    }
    console.log((this.contact.adresse))

    this.rowData.pop();
    for( let adresse of this.contact.adresse){
      this.rowData.push(
        {
          type: "" + adresse.typeAdresse,
          adresse: "" + adresse.numero + " " + adresse.typeVoie + " " + adresse.rue,
          ville: "" + adresse.ville,
          cp: adresse.cp,
          pays: adresse.pays,
          numero: adresse.numeroTelephone,
          commentaire: adresse.commentaire

        })
    }

  }

  addAdresse(){
    const formValue = this.Form.value;
    if(formValue['typeAdresse']!= ""
      && formValue['typeVoie']!= ""
      &&  formValue['rue'] != ""
      && formValue['numeroVoie'] != null
      && formValue['ville'] != ""
      &&  formValue['cp'] != ""
      && formValue['pays'] != ""
      && formValue['telephone'] != ""
      && formValue['commentaire']!= "") {
      this.adress.push(new Adresse(
        formValue['typeAdresse'],
        formValue['typeVoie'],
        formValue['rue'],
        parseInt(formValue['numeroVoie']),
        formValue['ville'],
        formValue['cp'],
        formValue['pays'],
        formValue['telephone'],
        formValue['commentaire']
      ));
    }

    this.refreshTable();
  }





  refreshTable(){
    this.rowData = [];
    for (let adresse of this.adress) {
      this.rowData.push(
        {
          type: adresse.typeAdresse,
          adresse: ""+adresse.numero+" "+adresse.typeVoie+" "+adresse.rue,
          ville: adresse.ville,
          cp: adresse.cp,
          pays: adresse.pays,
          numero: adresse.numeroTelephone,
          commentaire: adresse.commentaire
        }
      )
    }
  }
  initForm() {
    this.Form = this.fb.group(
      {
        nom : ['',Validators.required],
        prenom : ['',Validators.required],
        dateNaissance : ['',Validators.required],
        typeAdresse : ['',Validators.required],
        telephone : ['',Validators.required],
        typeVoie : ['',Validators.required],
        rue : ['',Validators.required],
        numeroVoie : ['',Validators.required],
        ville : ['',Validators.required],
        cp : ['',Validators.required],
        pays : ['',Validators.required],
        commentaire : ['',Validators.required]
      });
  }

  onRowClick(event: any): void {
    console.log(event.rowIndex);
  }

  onSubmit(): void {
    const formValue = this.Form.value;
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(formValue['dateNaissance'], 'dd-MMM-YYYY')

    this.contact = new Contact(""+formValue['nom'],""+formValue['prenom'],""+formattedDate);
    for(let adresse of this.adress){
      this.adresseService.addAdresse(adresse);
      this.contact.addAdresse(adresse);
    }
    this.contactService.addContact(this.contact).subscribe  (contact => {
        console.log(" Contact Added");
      }
    );
    this.router.navigate(['']);

  }

  retour(){
    this.router.navigate(['']);
  }


  deleteAdresses(){
    this.rowData = [];
  }
}
