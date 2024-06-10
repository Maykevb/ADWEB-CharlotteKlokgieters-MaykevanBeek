import { Component } from '@angular/core';
import {Huishoudboekje} from "../models/huishoudboekje.model";
import {HuishoudboekjeService} from "../huishoudboekje.service";

@Component({
  selector: 'app-huishoudboekje-creeer',
  templateUrl: './huishoudboekje-creeer.component.html',
  styleUrl: './huishoudboekje-creeer.component.css'
})
export class HuishoudboekjeCreeerComponent {
  huishoudboekje: Huishoudboekje = new Huishoudboekje("", "", "");

  constructor(private service: HuishoudboekjeService) {
  }

  onAdd() {
    if (this.huishoudboekje.naam != "") {
      this.service.addHuishoudboekje(this.huishoudboekje);
      this.huishoudboekje = new Huishoudboekje("", "", "");
    }
  }
}
