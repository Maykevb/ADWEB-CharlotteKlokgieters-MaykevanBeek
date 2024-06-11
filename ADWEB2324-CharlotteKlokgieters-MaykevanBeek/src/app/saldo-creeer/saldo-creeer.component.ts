import { Component, Input } from '@angular/core';
import { HuishoudboekjeService } from "../huishoudboekje.service";
import { Saldo } from "../models/saldo.model";
import { Huishoudboekje } from "../models/huishoudboekje.model";
import {SaldoService} from "../saldo.service";

@Component({
  selector: 'app-saldo-creeer',
  templateUrl: './saldo-creeer.component.html',
  styleUrls: ['./saldo-creeer.component.css']
})
export class SaldoCreeerComponent {
  saldo: Saldo = new Saldo("", "");

  @Input() huishoudboekje: string | null | undefined;

  constructor(private service: SaldoService) {}

  onAdd() {
    if (this.saldo.bedrag != 0) {
      this.service.addSaldo(this.saldo);
      this.saldo = new Saldo("", "");
    }
  }
}
