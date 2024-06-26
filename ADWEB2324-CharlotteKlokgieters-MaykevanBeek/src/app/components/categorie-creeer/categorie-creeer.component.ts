import { Component, Input } from '@angular/core';
import { Categorie } from "../../models/categorie.model";
import { CategorieService } from "../../services/categorie.service";
import { Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-categorie-creeer',
  templateUrl: './categorie-creeer.component.html',
  styleUrl: './categorie-creeer.component.css'
})
export class CategorieCreeerComponent {
  ownerId: string | undefined = undefined
  categorie: Categorie = new Categorie("", "", this.ownerId);
  submitted = false;
  bestaatAl: boolean = false;
  negativeBudget: boolean = false;

  @Input() huishoudboekje: string | null | undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(private service: CategorieService, private authService: AuthService) {
    const authSub = this.authService.getCurrentUserId().subscribe(userId => {
      this.ownerId = userId;
      this.categorie = new Categorie("", "", this.ownerId);
    });

    this.subscriptions.add(authSub);
  }

  onAdd() {
    this.submitted = true;

    if(this.categorie.budget && this.categorie.budget <= 0) {
      this.negativeBudget = true;
    }

    if (this.categorie.naam && this.categorie.budget && this.categorie.budget > 0) {
      const catSub = this.service.getCategorieen(this.huishoudboekje).subscribe(categorieen => {
        const categorieExists = categorieen.some(categorie => categorie.naam === this.categorie.naam);
        if (categorieExists) {
          this.bestaatAl = true;
        } else if (this.categorie.naam != "" && this.categorie.budget && this.categorie.budget > 0) {
          if (this.categorie.eindDatum === undefined || this.categorie.eindDatum == undefined || !this.categorie.eindDatum) {
            this.categorie.eindDatum = null;
          }

          this.categorie.huishoudboekje = this.huishoudboekje;
          this.bestaatAl = false;
          this.submitted = false;
          this.negativeBudget = false;
          this.service.addCategorie(this.categorie).then(() => {
            this.categorie = new Categorie("", "", this.ownerId);
          });
        }
      });

      this.subscriptions.add(catSub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
