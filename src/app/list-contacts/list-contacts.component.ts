import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {



  contacts = [
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"}

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
