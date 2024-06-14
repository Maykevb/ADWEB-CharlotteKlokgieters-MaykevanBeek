import {Component, Input} from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";
import {SaldoService} from "../saldo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-categorie-lijst',
  templateUrl: './categorie-lijst.component.html',
  styleUrl: './categorie-lijst.component.css'
})
export class CategorieLijstComponent {
  categorieen: Categorie[] = [];
  saldoService: SaldoService;
  submitted = false;

  @Input() huishoudboekje: string | null | undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(private service: CategorieService, saldoService: SaldoService) {
    this.saldoService = saldoService;
  }

  ngOnInit() {
    const catSub = this.service.getCategorieen(this.huishoudboekje).subscribe(categorieen => {
      this.categorieen = categorieen;
    });

    this.subscriptions.add(catSub);
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected readonly undefined = undefined;
}
