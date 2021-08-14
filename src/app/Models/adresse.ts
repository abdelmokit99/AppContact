import {Md5} from "ts-md5";


export class Adresse {

  id: string;
  constructor(public typeAdresse: string, public typeVoie: string, public rue: string, public numero: number, public ville: string, public cp: number, public pays: string, public numeroTelephone: string, public commentaire: string) {
    this.typeAdresse = typeAdresse;
    this.typeVoie = typeVoie;
    this.rue = rue;
    this.numero = numero;
    this.ville = ville;
    this.cp = cp;
    this.pays = pays;
    this.numeroTelephone = numeroTelephone;
    this.id = Md5.hashStr(""+typeAdresse+typeVoie+rue+numero+ville+cp+pays+numeroTelephone+commentaire);

  }
}
