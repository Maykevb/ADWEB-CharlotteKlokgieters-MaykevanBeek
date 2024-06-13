import {Component, Input} from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";

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

  @Input() huishoudboekje: string | null | undefined;
  categorieenSubscription: Subscription | undefined;

  constructor(private service: CategorieService, private authService: AuthService) {
    this.authService.getCurrentUserId().subscribe(userId => {
      this.ownerId = userId;
      this.categorie = new Categorie("", "", this.ownerId);
    });
  }

  onAdd() {
    this.submitted = true;
    if (this.categorie.naam) {
      this.categorieenSubscription = this.service.getCategorieen(this.huishoudboekje).subscribe(categorieen => {
        const categorieExists = categorieen.some(categorie => categorie.naam === this.categorie.naam);
        if (categorieExists) {
          this.bestaatAl = true;
        } else {
          if (this.categorie.eindDatum === undefined) {
            this.categorie.eindDatum = null;
          }

          this.categorie.huishoudboekje = this.huishoudboekje;
          this.service.addCategorie(this.categorie);
          this.categorie = new Categorie("", "", this.ownerId);
          this.submitted = false;
          this.bestaatAl = false;
        }
      });
    }
  }
}
