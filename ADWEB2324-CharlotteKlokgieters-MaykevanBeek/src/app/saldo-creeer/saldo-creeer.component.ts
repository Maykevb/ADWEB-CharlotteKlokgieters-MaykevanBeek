import { Component, Input } from '@angular/core';
import { Saldo } from "../models/saldo.model";
import {SaldoService} from "../saldo.service";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-saldo-creeer',
  templateUrl: './saldo-creeer.component.html',
  styleUrls: ['./saldo-creeer.component.css']
})
export class SaldoCreeerComponent {
  ownerId: string | undefined = undefined;
  saldo: Saldo = new Saldo("", "", this.ownerId);
  submitted = false;

  @Input() huishoudboekje: string | null | undefined;

  constructor(private service: SaldoService, private authService: AuthService) {
    this.authService.getCurrentUserId().subscribe(userId => {
      this.ownerId = userId;
      this.saldo = new Saldo("", "", this.ownerId);
    });
  }

  onAdd() {
    this.submitted = true;
    if (this.saldo.bedrag != null) {
      this.saldo.huishoudboekje = this.huishoudboekje;
      this.service.addSaldo(this.saldo);
      this.saldo = new Saldo("", "", this.ownerId);
      this.submitted = false;
    }
  }
}
