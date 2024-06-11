export class Categorie {
  id: string;
  naam: string;
  editMode?: boolean;

  constructor(id: string, naam: string) {
    this.id = id;
    this.naam = naam;
  }
}
