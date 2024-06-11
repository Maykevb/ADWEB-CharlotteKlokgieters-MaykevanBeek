import { Component } from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-categorie-lijst',
  templateUrl: './categorie-lijst.component.html',
  styleUrl: './categorie-lijst.component.css'
})
export class CategorieLijstComponent {
  categorieen: Categorie[] = [];

  constructor(private service: CategorieService) {
    service.getCategorieen().subscribe(categorieen => {
      this.categorieen = categorieen;
    });
  }
}
