import { Component } from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";
import {SaldoService} from "../saldo.service";

@Component({
  selector: 'app-categorie-lijst',
  templateUrl: './categorie-lijst.component.html',
  styleUrl: './categorie-lijst.component.css'
})
export class CategorieLijstComponent {
  categorieen: Categorie[] = [];
  saldoService: SaldoService;

  constructor(private service: CategorieService, saldoService: SaldoService) {
    service.getCategorieen().subscribe(categorieen => {
      this.categorieen = categorieen;
    });

    this.saldoService = saldoService;
  }

  toggleEdit(categorie: Categorie) {
    categorie.editMode = !categorie.editMode;
  }

  onSave(categorie: Categorie) {
    categorie.editMode = false;
    this.service.updateCategorie(categorie);
  }

  onDelete(categorie: Categorie) {
    this.service.deleteCategorie(categorie);
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  dragEnter(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, categorie: any) {
    event.preventDefault();
    const draggedItem = JSON.parse(event.dataTransfer?.getData('text/plain') || '');
    let oldCategorie = draggedItem.categorie;
    draggedItem.categorie = categorie;
    this.saldoService.updateCategorieOfSaldo(draggedItem, oldCategorie);
  }
}
