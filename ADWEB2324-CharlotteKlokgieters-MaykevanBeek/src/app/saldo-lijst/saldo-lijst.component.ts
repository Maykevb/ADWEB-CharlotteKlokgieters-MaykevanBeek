import { Component } from '@angular/core';
import { Saldo } from "../models/saldo.model";
import { SaldoService } from "../saldo.service";
import {Categorie} from "../models/categorie.model";

@Component({
  selector: 'app-saldo-lijst',
  templateUrl: './saldo-lijst.component.html',
  styleUrls: ['./saldo-lijst.component.css']
})
export class SaldoLijstComponent {
  inkomsten: Saldo[] = [];
  filterInkomsten: Saldo[] = [];
  uitgaven: Saldo[] = [];
  filterUitgaven: Saldo[] = [];
  selectedMonth: string;
  totalInkomsten: number;
  totalUitgaven: number;
  totalSaldo: number;

  constructor(private service: SaldoService) {
    this.selectedMonth = this.getDefaultMonth();
    this.filterByMonth();
    this.totalUitgaven = 0;
    this.totalInkomsten = 0;
    this.totalSaldo = 0;

    this.service.getInkomsten().subscribe(saldo => {
      this.inkomsten = saldo;
      this.filterByMonth();
      this.getTotals();
      this.getTotalSaldo();
    });

    this.service.getUitgaven().subscribe(saldo => {
      this.uitgaven = saldo;
      this.filterByMonth();
      this.getTotals()
      this.getTotalSaldo();
    });
  }

  getTotals() {
    let total = 0;

    for (const inkomst of this.filterInkomsten) {
      total += parseFloat(String(inkomst.bedrag));
    }

    this.totalInkomsten = total;

    total = 0;

    for (const uitgave of this.filterUitgaven) {
      total +=  parseFloat(String(uitgave.bedrag));
    }

    this.totalUitgaven = total
  }

  getTotalSaldo() {
    let total = 0;

    for (const inkomst of this.filterInkomsten) {
      total += parseFloat(String(inkomst.bedrag));
    }

    for (const uitgave of this.filterUitgaven) {
      total +=  parseFloat(String(uitgave.bedrag));
    }

    this.totalSaldo = total;
  }

  toggleEdit(saldo: Saldo) {
    saldo.editMode = !saldo.editMode;
  }

  onSave(saldo: Saldo) {
    saldo.editMode = false;
    this.service.updateSaldo(saldo);
  }

  onDelete(saldo: Saldo) {
    this.service.deleteSaldo(saldo);
  }

  filterByMonth() {
    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-').map(Number);
      this.filterInkomsten = this.inkomsten.filter(saldo => {
        const datum = new Date(saldo.datum);
        return (datum.getFullYear() === year) && (datum.getMonth() + 1 === month);
      });

      this.filterUitgaven = this.uitgaven.filter(saldo => {
        const datum = new Date(saldo.datum);
        return (datum.getFullYear() === year) && (datum.getMonth() + 1 === month);
      });
    }
  }

  getDefaultMonth(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${month < 10 ? '0' + month : month}`;
  }
}
