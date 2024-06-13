import {Component, Input} from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-categorie-creeer',
  templateUrl: './categorie-creeer.component.html',
  styleUrl: './categorie-creeer.component.css'
})
export class CategorieCreeerComponent {
  categorie: Categorie = new Categorie("", "");
  submitted = false;

  @Input() huishoudboekje: string | null | undefined;

  constructor(private service: CategorieService) { }

  onAdd() {
    this.submitted = true;
    if (this.categorie.eindDatum === undefined) {
      this.categorie.eindDatum = null;
    }
    if (this.categorie.naam !== "" && this.categorie.budget != 0 && this.categorie.budget != null) {
      this.categorie.huishoudboekje = this.huishoudboekje;
      this.service.addCategorie(this.categorie);
      this.categorie = new Categorie("", "");
      this.submitted = false;
    }
  }
}
