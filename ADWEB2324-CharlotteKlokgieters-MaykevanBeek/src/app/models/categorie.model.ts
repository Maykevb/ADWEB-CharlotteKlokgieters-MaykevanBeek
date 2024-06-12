export class Categorie {
  id: string;
  naam: string;
  budget?: number | null;
  huidigBudget: number;
  eindDatum?: Date | null;
  editMode?: boolean;
  huishoudboekje: string | null | undefined

  constructor(id: string, naam: string, budget?: number, eindDatum?: Date) {
    this.id = id;
    this.naam = naam;
    this.budget = budget;
    this.huidigBudget = 0.00;
    this.eindDatum = eindDatum;
    this.editMode = false;
    this.huishoudboekje = "";
  }
}
