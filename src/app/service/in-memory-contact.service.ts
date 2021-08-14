import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from '../Models/contact';
import {Adresse} from "../Models/adresse";

@Injectable({
  providedIn: 'root',
})
export class InMemoryContactService implements InMemoryDbService {
  createDb() {
    let contacts = [
      new Contact( "Jean", "Jack", "14-09-1998",
        [new Adresse( "domicile", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak"),
          new Adresse( "pére", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak")]),
      new Contact( "Abdelmokit", "bougouza", "10-08-1999",
       [
         new Adresse( "pére", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak"),
         new Adresse( "mére", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamakdiha fmamak diha fmamak diha fmamak")
       ]
        ),
      new Contact( "ahmed", "chrouqat", "10-08-1999",
        [
          new Adresse( "travail", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak")
        ]),
      new Contact( "billy", "haliday", "10-08-1999",
        [
          new Adresse( "travail", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak"),
          new Adresse( "travail", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak")
        ]),
      new Contact( "edith", "piaf", "10-08-1999",
        [
          new Adresse( "travail", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak"),
          new Adresse( "pére", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak")
        ]

        )
    ];




    return {contacts};
  }


}
