import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from "../service/contact.service";
import {Adresse} from "../Models/adresse";
import {AllCommunityModules, Module} from "@ag-grid-community/all-modules";
import {Contact} from "../Models/contact";
import {AdresseService} from "../service/adresse.service";
import {AgGridAngular} from "@ag-grid-community/angular";
import {GridOptions} from "ag-grid-community";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adresse-form',
  templateUrl: './adresse-form.component.html',
  styleUrls: ['./adresse-form.component.css']
})
export class AdresseFormComponent implements OnInit{

  gridOptions : GridOptions;

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
  contact : Contact;

  constructor(private fb: FormBuilder,
              private contactService: ContactService,
              private adresseService : AdresseService,
              private router: Router) {
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
    this.gridOptions = {
      rowData: this.rowData,
      columnDefs: this.columnDefs,
    }
  }
  ngOnInit() {
    this.rowData.pop();
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


  AddUser(){
    const formValue = this.Form.value;
    this.contact = new Contact(""+formValue['nom'],""+formValue['prenom'],""+formValue['dateNaissance']);
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
    this.contact = new Contact(""+formValue['nom'],""+formValue['prenom'],""+formValue['dateNaissance']);
    for(let adresse of this.adress){
      this.adresseService.addAdresse(adresse);
      this.contact.addAdresse(adresse.id);
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
