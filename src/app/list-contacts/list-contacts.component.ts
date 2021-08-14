import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactService} from "../service/contact.service";
import {Contact} from "../Models/contact";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit,OnDestroy {

  contacts: Contact[] = [];
  contactSubscription : Subscription;

/*
  contacts = [
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"},
    {nom : "abdelmokit", prenom: "bougouza", date: "10/08/1999"}

  ];*/
  constructor(private contactService: ContactService, private router:Router) {
    this.contactSubscription = new Subscription();
  }

  ngOnInit(): void {
    console.log(this.contacts.length)
    let a = new Contact( "hmida", "bougouza", "10/08/1999",["fdc6ea5382cbe7d11ef0219f5216bcb2","8f3349f666cc5efca6b6b574bdf33098"]);
    //this.contactService.addContact(a);
    this.contactService.addContact(a)
      .subscribe(contact => {
        console.log("Contact added");
      });
    this.getContacts();
  }



  getContacts(): void {
    this.contactSubscription = this.contactService.getContacts().subscribe( contacts => this.contacts = contacts)
  }
  getContactById(id: string){
  }

  deleteContact(index: number){

    this.contacts = this.contacts.filter(c => c !== this.contacts[index]);
    this.contactService.deleteContact(this.contacts[index].id).subscribe();
  }

  reconstructContact(nom: string, prenom: string, date_naissance: string, adresse: string[]){
    let aux = new Contact(nom,prenom,date_naissance,adresse);
  }

  AddContact(){
    this.router.navigate(['/adresseForm']);
  }
  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

}
