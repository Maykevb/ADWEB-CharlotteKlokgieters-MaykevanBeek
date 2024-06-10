import {Categorie} from "./categorie.model";

export class Saldo {
  id: string;
  tag: string;
  categorie: Categorie;
  bedrag: number;

  constructor(id: string, tag: string, categorie: Categorie, bedrag: string) {
    this.id = id;
    this.tag = tag;
    this.categorie = categorie;
    this.bedrag = parseFloat(bedrag);
  }
}

