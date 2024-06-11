export class Categorie {
  id: string;
  naam: string;
  budget?: number;
  eindDatum?: Date | null;
  editMode?: boolean;

  constructor(id: string, naam: string, eindDatum?: Date) {
    this.id = id;
    this.naam = naam;
    // @ts-ignore
    this.budget = null;
    this.eindDatum = eindDatum;
    this.editMode = false;
  }
}
