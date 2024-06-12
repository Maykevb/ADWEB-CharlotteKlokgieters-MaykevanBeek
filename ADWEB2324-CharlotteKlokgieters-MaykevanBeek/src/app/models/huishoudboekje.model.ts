export class Huishoudboekje {
  id: string;
  naam: string;
  omschrijving: string;
  gearchiveerd: boolean;
  editMode?: boolean;

  constructor(id: string, omschrijving: string, naam: string) {
    this.id = id;
    this.naam = naam;
    this.omschrijving = omschrijving;
    this.gearchiveerd = false;
  }
}
