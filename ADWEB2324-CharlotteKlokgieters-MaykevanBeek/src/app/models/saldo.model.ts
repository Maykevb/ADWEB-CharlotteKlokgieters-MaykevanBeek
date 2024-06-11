import {Categorie} from "./categorie.model";

export class Saldo {
  id: string;
  tag: string;
  categorie: Categorie | null;
  bedrag: number;

  constructor(id: string, tag: string) {
    this.id = id;
    this.tag = tag;
    // @ts-ignore
    this.bedrag = null;
    this.categorie = null;
  }
}

