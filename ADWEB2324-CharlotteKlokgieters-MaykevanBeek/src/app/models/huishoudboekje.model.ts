import {Saldo} from "./saldo.model";

export class Huishoudboekje {
  id: string;
  naam: string;
  omschrijving: string;
  saldo: Saldo[];
  gearchiveerd: boolean;
  editMode?: boolean;

  constructor(id: string, omschrijving: string, naam: string) {
    this.id = id;
    this.naam = naam;
    this.omschrijving = omschrijving;
    this.saldo = [];
    this.gearchiveerd = false;
  }

  addSaldo(saldo: Saldo): void {
    this.saldo.push(saldo);
  }
}
