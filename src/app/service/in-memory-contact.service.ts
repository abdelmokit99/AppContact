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
      new Contact( "chaimae", "jarid", "14/09/1998",["8f3349f666cc5efca6b6b574bdf33098","be199f631cd702851c2790312b601a37"]),
      new Contact( "Abdelmokit", "bougouza", "10/08/1999",["8f3349f666cc5efca6b6b574bdf33098","be199f631cd702851c2790312b601a37"]),
      new Contact( "Abdelmokit", "bougouza", "10/08/1999",["fdc6ea5382cbe7d11ef0219f5216bcb2","8f3349f666cc5efca6b6b574bdf33098"]),
      new Contact( "Abdelmokit", "bougouza", "10/08/1999",["8f3349f666cc5efca6b6b574bdf33098","be199f631cd702851c2790312b601a37"]),
      new Contact( "Abdelmokit", "bougouza", "10/08/1999",["b3d397971aaa14c6ead35b57c6da5838","b3d397971aaa14c6ead35b57c6da5838"])
    ];
    let adresses = [
      new Adresse( "domicile", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak"),
      new Adresse( "pére", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak"),
      new Adresse( "mére", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamakdiha fmamak diha fmamak diha fmamak"),
      new Adresse( "travail", "rue", "Saint Exupéry", 70, "Brest", 29200, "France","0610777561", " diha fmamak diha fmamak diha fmamak diha fmamak diha fmamak")
    ];

    return {contacts,adresses};
  }


}
