export class Huishoudboekje {
  id: string;
  naam: string;
  omschrijving: string;
  gearchiveerd: boolean;
  editMode?: boolean;
  ownerId: string | undefined;

  constructor(id: string, omschrijving: string, naam: string, ownerId: string | undefined) {
    this.id = id;
    this.naam = naam;
    this.omschrijving = omschrijving;
    this.gearchiveerd = false;
    this.ownerId = ownerId;
  }
}
