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
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-adresse-form',
  templateUrl: './adresse-form.component.html',
  styleUrls: ['./adresse-form.component.css']
})
export class AdresseFormComponent implements OnInit{

  gridOptions : GridOptions;

  public modules: Module[] = AllCommunityModules;
/*
  columnDefs = [
    {field: 'type', sortable: true, filter: true},
    {field: 'adresse', sortable: true, filter: true},
    {field: 'ville', sortable: true, filter: true},
    {field: 'cp', sortable: true, filter: true},
    {field: 'pays', sortable: true, filter: true},
    {field: 'numero', sortable: true, filter: true},
    {field: 'commentaire'}];
  defaultColDef = {
    editable: true,
  };*/
  columnDefs = [
    {headerName: "type d'adresse", field:"type"},
    {headerName: "numero de voie", field: 'numeroVoie',sortable: true,filter: true },
    {headerName: "type de voie", field: 'typeVoie',sortable: true,filter: true },
    {headerName: "nom de voie", field: 'nomVoie',sortable: true,filter: true },
    {field: 'ville', sortable: true, filter: true},
    {field: 'cp', sortable: true, filter: true},
    {field: 'pays', sortable: true, filter: true},
    {field: 'numero', sortable: true, filter: true},
    {field: 'commentaire'}
  ];
  selectedRow ={};


  defaultColDef = {
    editable: true,
  };


  rowData = [
    { type: "",
      numeroVoie: "",
      typeVoie: "",
      nomVoie: "",
      ville:"",
      cp: 0,
      pays: "",
      numero: "",
      commentaire: "" }    ];

  Form: FormGroup;
  adress : Adresse[];
  contact : Contact;

  constructor(private fb: FormBuilder,
              private contactService: ContactService,
              private adresseService : AdresseService,
              private router: Router) {
    this.Form = this.fb.group({
      nom : '',
      prenom : '',
      dateNaissance : '',
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
      defaultColDef : this.defaultColDef,
      rowSelection: 'single',
      //getSelectedRows: 'getSelectedRows',
    }
  }
  ngOnInit() {
    this.rowData.pop();

  }
/**
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
  }*/
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

  //console.log(this.rowData)
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
    let formattedDate = datepipe.transform(formValue['dateNaissance'], 'dd-MM-yyyy')

    this.contact = new Contact(""+formValue['nom'],""+formValue['prenom'],""+formattedDate);
    for (let adresse of this.rowData) {
      this.adress.push(new Adresse( adresse.type, adresse.typeVoie, adresse.nomVoie, +adresse.numeroVoie , adresse.ville, adresse.cp, adresse.pays,adresse.numero, adresse.commentaire))
    }
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
    this.adress = [];
  }
}
