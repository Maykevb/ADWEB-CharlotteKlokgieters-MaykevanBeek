import { Component } from '@angular/core';
import {Huishoudboekje} from "../models/huishoudboekje.model";
import {HuishoudboekjeService} from "../huishoudboekje.service";

@Component({
  selector: 'app-huidshoudboekje-lijst',
  templateUrl: './huidshoudboekje-lijst.component.html',
  styleUrl: './huidshoudboekje-lijst.component.css'
})
export class HuidshoudboekjeLijstComponent {
  query: string = ""

  huishoudboekjes: Huishoudboekje[] = [];

  constructor(private service: HuishoudboekjeService) {
    service.getHuishoudboekjes().subscribe(huishoudboekjes => {
      this.huishoudboekjes = huishoudboekjes;
    })
  }

  onDelete(huishoudboekje: Huishoudboekje) {
    this.service.deleteHuishoudboekje(huishoudboekje);
  }
}


