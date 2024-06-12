import { Component, Input } from '@angular/core';
import { Saldo } from "../models/saldo.model";
import {SaldoService} from "../saldo.service";

@Component({
  selector: 'app-saldo-creeer',
  templateUrl: './saldo-creeer.component.html',
  styleUrls: ['./saldo-creeer.component.css']
})
export class SaldoCreeerComponent {
  saldo: Saldo = new Saldo("", "");
  submitted = false;

  @Input() huishoudboekje: string | null | undefined;

  constructor(private service: SaldoService) {}

  onAdd() {
    this.submitted = true;
    if (this.saldo.bedrag != null) {
      this.service.addSaldo(this.saldo);
      this.saldo = new Saldo("", "");
      this.submitted = false;
    }
  }
}
