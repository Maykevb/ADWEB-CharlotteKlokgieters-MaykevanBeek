import { Component } from '@angular/core';
import {Categorie} from "../models/categorie.model";
import {CategorieService} from "../categorie.service";
import {Saldo} from "../models/saldo.model";
import {SaldoService} from "../saldo.service";

@Component({
  selector: 'app-saldo-lijst',
  templateUrl: './saldo-lijst.component.html',
  styleUrl: './saldo-lijst.component.css'
})
export class SaldoLijstComponent {
  inkomsten: Saldo[] = [];
  uitgaven: Saldo[] = [];

  constructor(private service: SaldoService) {
    service.getInkomsten().subscribe(saldo => {
      this.inkomsten = saldo;
    });

    service.getUitgaven().subscribe(saldo => {
      this.uitgaven = saldo;
    });
  }
}
