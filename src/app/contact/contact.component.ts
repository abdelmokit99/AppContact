import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() nom: string;
  @Input() prenom: string;
  @Input() dateNaissance: string;

  columnDefs = [
    { field: 'type', sortable: true, filter: true },
    { field: 'adresse', sortable: true, filter: true },
    { field: 'ville', sortable: true, filter: true },
    { field: 'cp', sortable: true, filter: true },
    { field: 'pays', sortable: true, filter: true },
    { field: 'numero', sortable: true, filter: true },
    { field: 'commentaire' }

  ];

  rowData = [
    { type: "domicile", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak" },
    { type: "pére", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak" },
    { type: "mére", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamakdiha fmamak diha fmamak diha fmamak" },
    { type: "travail", adresse: "70 rue Saint Exupéry", ville:"Brest", cp: 29200, pays: "france",numero: "0610777561", commentaire: " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak" }
  ];

  constructor() {
    this.nom = ""
    this.prenom= ""
    this.dateNaissance= ""
  }

  ngOnInit(): void {
  }

}
