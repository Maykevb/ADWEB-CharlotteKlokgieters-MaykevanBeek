import {Categorie} from "./categorie.model";

export class Saldo {
  id: string;
  tag: string;
  categorie: Categorie | null;
  bedrag: number;

  constructor(id: string, tag: string, bedrag: string) {
    this.id = id;
    this.tag = tag;
    this.bedrag = parseFloat(bedrag);
    this.categorie = null;
  }
}

