import { Component } from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-categorie-creeer',
  templateUrl: './categorie-creeer.component.html',
  styleUrl: './categorie-creeer.component.css'
})
export class CategorieCreeerComponent {
  categorie: Categorie = new Categorie("", "");

  constructor(private service: CategorieService) {

  }

  onAdd() {
    if (this.categorie.naam != "") {
      this.service.addCategorie(this.categorie);
      this.categorie = new Categorie("", "");
    }
  }
}
