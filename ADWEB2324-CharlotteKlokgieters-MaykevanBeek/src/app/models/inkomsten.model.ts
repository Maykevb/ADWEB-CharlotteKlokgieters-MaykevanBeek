export class Inkomsten {
  id: string;
  tag: string;
  categorie: string;
  bedrag: number;

  constructor(id: string, tag: string, categorie: string, bedrag: string) {
    this.id = id;
    this.tag = tag;
    this.categorie = categorie;
    this.bedrag = parseFloat(bedrag);
  }
}

