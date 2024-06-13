import { Component } from '@angular/core';
import {Huishoudboekje} from "../models/huishoudboekje.model";
import {HuishoudboekjeService} from "../huishoudboekje.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-huishoudboekje-creeer',
  templateUrl: './huishoudboekje-creeer.component.html',
  styleUrl: './huishoudboekje-creeer.component.css'
})
export class HuishoudboekjeCreeerComponent {
  ownerId: string | undefined = undefined;
  huishoudboekje: Huishoudboekje = new Huishoudboekje("", "", "", this.ownerId);
  submitted = false;

  constructor(private service: HuishoudboekjeService, private  authService: AuthService) {
    this.authService.getCurrentUserId().subscribe(userId => {
      this.ownerId = userId;
      this.huishoudboekje = new Huishoudboekje("", "", "", this.ownerId);
    });
  }

  onAdd() {
    this.submitted = true;

    if (this.huishoudboekje.naam != "") {
      this.service.addHuishoudboekje(this.huishoudboekje);
      this.huishoudboekje = new Huishoudboekje("", "", "", this.ownerId);
      this.submitted = false
    }
  }
}
