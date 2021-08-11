export class Contact{
  private _id: number;
  private _nom: string;
  private _prenom: string;
  private _date_naissance: Date;
  private _adresse: number[];

  constructor(id: number, nom: string, prenom: string, date_naissance: Date) {
    this._id = id;
    this._nom = nom;
    this._prenom = prenom;
    this._date_naissance = date_naissance;
    this._adresse = [];
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get date_naissance(): Date {
    return this._date_naissance;
  }

  set date_naissance(value: Date) {
    this._date_naissance = value;
  }

  get adresse(): number[] {
    return this._adresse;
  }

  set adresse(value: number[]) {
    this._adresse = value;
  }
}
