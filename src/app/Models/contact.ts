
import {Md5} from 'ts-md5/dist/md5';
import {Adresse} from "./adresse";


export class Contact{
  id : string;
  adresses: Adresse[];

  constructor(public nom: string= "", public prenom: string= "", public date_naissance: string= "", public adresse : Adresse[] =[]) {
    this.nom = nom;
    this.prenom = prenom;
    this.date_naissance = date_naissance;
    this.adresses = adresse;
    this.id = Md5.hashStr(""+nom+prenom+date_naissance);
  }
   addAdresse(adresse : Adresse){
      this.adresses.push(adresse);
   }




}
