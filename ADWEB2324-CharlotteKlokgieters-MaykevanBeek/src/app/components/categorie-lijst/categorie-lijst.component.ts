import { Component, Input } from '@angular/core';
import { Categorie } from "../../models/categorie.model";
import { CategorieService } from "../../services/categorie.service";
import { SaldoService } from "../../services/saldo.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-categorie-lijst',
  templateUrl: './categorie-lijst.component.html',
  styleUrl: './categorie-lijst.component.css'
})
export class CategorieLijstComponent {
  categorieen: Categorie[] = [];
  saldoService: SaldoService;
  submitted = false;
  negativeBudget: boolean = false;
  bestaatAl: boolean = false;

  @Input() huishoudboekje: string | null | undefined;
  subscriptions: Subscription = new Subscription();


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

    if(categorie.budget && categorie.budget <= 0) {
      this.negativeBudget = true;
    }

    if (categorie.naam && categorie.budget && categorie.budget > 0) {
      const catSub = this.service.getCategorieen(this.huishoudboekje).subscribe(categorieen => {
        const categorieExists = categorieen.some(categorie2 => categorie2.naam === categorie.naam && categorie2.id !== categorie.id);
        if (categorieExists) {
          this.bestaatAl = true;
        } else if (categorie.naam != "" && categorie.budget && categorie.budget > 0) {
          if (categorie.eindDatum === undefined || categorie.eindDatum == undefined || !categorie.eindDatum) {
            categorie.eindDatum = null;
          }

          categorie.huishoudboekje = this.huishoudboekje;
          this.bestaatAl = false;
          this.submitted = false;
          this.negativeBudget = false;
          categorie.editMode = false;
          this.service.updateCategorie(categorie)
        }
      });

      this.subscriptions.add(catSub);
    }
  }

  onDelete(categorie: Categorie) {
    this.service.deleteCategorie(categorie, this.saldoService, this.huishoudboekje);
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
