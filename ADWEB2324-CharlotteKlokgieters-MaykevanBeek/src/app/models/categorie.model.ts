export class Categorie {
  id: string;
  naam: string;
  budget?: number;
  huidigBudget: number;
  eindDatum?: Date | null;
  editMode?: boolean;
  huishoudboekje: string | null | undefined

  constructor(id: string, naam: string, eindDatum?: Date) {
    this.id = id;
    this.naam = naam;
    // @ts-ignore
    this.budget = null;
    this.huidigBudget = 0;
    this.eindDatum = eindDatum;
    this.editMode = false;
    this.huishoudboekje = "";
  }
}
