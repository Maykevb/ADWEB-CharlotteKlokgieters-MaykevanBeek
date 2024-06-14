import {Categorie} from "./categorie.model";

export class Saldo {
  id: string;
  tag: string;
  categorie: Categorie | null;
  bedrag: number;
  datum: string;
  editMode: boolean;
  huishoudboekje: string | null | undefined;
  ownerId: string | undefined;

  constructor(id: string, tag: string, ownerId: string | undefined) {
    this.id = id;
    this.tag = tag;
    // @ts-ignore
    this.bedrag = null;
    this.categorie = null;
    this.datum = "";
    this.editMode = false;
    this.huishoudboekje = "";
    this.ownerId = ownerId;
  }
}

