import {Component, Input} from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-categorie-lijst',
  templateUrl: './categorie-lijst.component.html',
  styleUrl: './categorie-lijst.component.css'
})
export class CategorieLijstComponent {
  categorieen: Categorie[] = [];
  submitted = false;

  @Input() huishoudboekje: string | null | undefined;

  constructor(private service: CategorieService) { }

  ngOnInit() {
    this.service.getCategorieen(this.huishoudboekje).subscribe(categorieen => {
      this.categorieen = categorieen;
    });
  }

  toggleEdit(categorie: Categorie) {
    categorie.editMode = !categorie.editMode;
  }

  onSave(categorie: Categorie) {
    this.submitted = true;
    if (categorie.eindDatum === undefined) {
      categorie.eindDatum = null;
    }
    if (categorie.naam !== "" && categorie.budget != 0 && categorie.budget != null) {
      categorie.editMode = false;
      this.service.updateCategorie(categorie);
      this.submitted = false;
    }
  }

  onDelete(categorie: Categorie) {
    this.service.deleteCategorie(categorie);
  }
}
