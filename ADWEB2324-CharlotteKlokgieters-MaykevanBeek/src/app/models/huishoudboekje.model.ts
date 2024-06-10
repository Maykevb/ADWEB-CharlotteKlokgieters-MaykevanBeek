import {Inkomsten} from "./inkomsten.model";
import {Uitgave} from "./uitgave.model";

export class Huishoudboekje {
  id: string;
  naam: string;
  omschrijving: string;
  uitgaven: Uitgave[];
  inkomsten: Inkomsten[];
  gearchiveerd: boolean;

  constructor(id: string, omschrijving: string, naam: string) {
    this.id = id;
    this.naam = naam;
    this.omschrijving = omschrijving;
    this.uitgaven = [];
    this.inkomsten = [];
    this.gearchiveerd = false;
  }

  addUitgave(uitgave: Uitgave): void {
    this.uitgaven.push(uitgave);
  }

  addInkomsten(inkomsten: Inkomsten): void {
    this.uitgaven.push(inkomsten);
  }
}
